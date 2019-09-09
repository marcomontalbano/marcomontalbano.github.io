const fetch = require('node-fetch');

const { GITHUB_ACCESS_TOKEN } = process.env;

const ghRunQuery = (query) => fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
}).then((response) => response.json());

const createRepositoryTopics = ({ edges = [] }) => edges.map((edge) => edge.node.topic.name);

const createFile = async (url) => {
    const response = await fetch(url)
        // eslint-disable-next-line no-console
        .catch((error) => console.info(`'There has been a problem with your fetch operation: ${error.message}`));

    const isPresent = response.ok;
    const source = isPresent && response.headers.get('content-type').includes('text/plain') ? await response.text() : undefined;
    const headers = isPresent ? {
        'content-type': response.headers.get('content-type'),
    } : undefined;

    return {
        [url.match(/raw\/master\/(.*)/)[1]]: {
            url,
            isPresent,
            headers,
            source,
        },
    };
};

const createRepository = async ({ node }) => {
    const cover = await createFile(`${node.url}/raw/master/cover.png`);
    return {
        ...node,
        visible: Object.values(cover)[0].isPresent === true,
        starCount: node.stargazers.totalCount,
        // forkCount: node.forks.totalCount,
        repositoryTopics: createRepositoryTopics(node.repositoryTopics),
        files: {
            ...(await createFile(`${node.url}/raw/master/README.md`)),
            ...(await createFile(`${node.url}/raw/master/package.json`)),
            ...cover,
        },
    };
};

const sanitize = async ({ data: { viewer } }) => {
    const repositories = await Promise.all(viewer.repositories.edges.map(createRepository));
    return {
        ...viewer,
        repositoryCount: repositories.length,
        repositories: repositories.reduce((acc, repository) => ({
            ...acc,
            [repository.name]: repository,
        }), {}),
    };
};

module.exports = {
    ghRunQuery,
    sanitize,
    createRepository,
};
