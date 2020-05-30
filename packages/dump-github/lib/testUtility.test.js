const nock = require('nock')

const nockNode = (name, { readmeStatusCode = 200, coverStatusCode = 200, isPrivate = true }) => {
    const node = {
        name,
        isPrivate,
        description: `Description for "${name}".`,
        url: `https://github.com/marcomontalbano/${name}`,
        stargazers: {
            totalCount: 2,
        },
        forkCount: 0,
        repositoryTopics: {
            edges: [{ node: { topic: { name: 'kata' } } }, { node: { topic: { name: 'tdd' } } }],
        },
    }

    const expectedResult = {
        ...node,
        customFields: {
            title: readmeStatusCode === 200 ? 'Project Title' : node.name,
            visible: false,
            starCount: 2,
            forkCount: 0,
            repositoryTopics: ['kata', 'tdd'],
            cover: {
                originalUrl: `${node.url}/raw/master/cover.png`,
                url: `${node.url}/raw/master/cover.png`,
                isPresent: coverStatusCode === 200,
                headers: coverStatusCode === 200 ? { 'content-type': 'image/gif' } : undefined,
                source: undefined,
            },
            readme: {
                originalUrl: `${node.url}/raw/master/README.md`,
                url: `${node.url}/raw/master/README.md`,
                isPresent: readmeStatusCode === 200,
                headers: readmeStatusCode === 200 ? { 'content-type': 'text/plain' } : undefined,
                source:
                    readmeStatusCode === 200
                        ? `# Project Title\nREADME.md source :)\n[Absolute URL](https://example.com)\n![Relative URL](${node.url}/raw/master/images/example.png)`
                        : undefined,
            },
        },
    }

    nock(`${node.url}/raw/master`)
        .get(/cover\.png/)
        .reply(
            coverStatusCode,
            () => 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
            { 'content-type': 'image/gif' }
        )
        .get(/README\.md/)
        .reply(
            readmeStatusCode,
            () =>
                '# Project Title\nREADME.md source :)\n[Absolute URL](https://example.com)\n![Relative URL](images/example.png)',
            { 'content-type': 'text/plain' }
        )

    return [node, expectedResult]
}

const nockResponse = (nodes = []) => {
    nock('https://api.github.com')
        .post('/graphql')
        .reply(200, () => ({
            data: {
                viewer: {
                    repositories: {
                        edges: [...nodes.map((node) => ({ node }))],
                    },
                },
            },
        }))
}

describe('', () => {
    it('', () => {})
})

module.exports = {
    nock,
    nockNode,
    nockResponse,
}
