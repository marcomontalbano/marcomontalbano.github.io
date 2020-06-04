const nock = require('nock')

const nockNode = (
    name,
    { readmeStatusCode = 200, coverStatusCode = 200, isPrivate = true, defaultBranchName = 'production' }
) => {
    const node = {
        name,
        isPrivate,
        description: `Description for "${name}".`,
        url: `https://github.com/marcomontalbano/${name}`,
        defaultBranchRef: {
            name: defaultBranchName,
        },
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
            defaultBranch: defaultBranchName,
            repositoryTopics: ['kata', 'tdd'],
            cover: {
                originalUrl: `${node.url}/raw/${defaultBranchName}/cover.png`,
                url: `${node.url}/raw/${defaultBranchName}/cover.png`,
                isPresent: coverStatusCode === 200,
                headers: coverStatusCode === 200 ? { 'content-type': 'image/gif' } : undefined,
                source: undefined,
            },
            readme: {
                originalUrl: `${node.url}/raw/${defaultBranchName}/README.md`,
                url: `${node.url}/raw/${defaultBranchName}/README.md`,
                isPresent: readmeStatusCode === 200,
                headers: readmeStatusCode === 200 ? { 'content-type': 'text/plain' } : undefined,
                source:
                    readmeStatusCode === 200
                        ? `
# Project Title
README.md source :)
[Absolute URL](https://example.com)
![Image Relative URL 1](${node.url}/raw/${defaultBranchName}/images/example1.png) ![Image Relative URL 2](${node.url}/raw/${defaultBranchName}/images/example2.png)
[Just Relative URL](${node.url}/blob/${defaultBranchName}/EXAMPLE.md)
[Relative URL with Hyperlink](${node.url}/blob/${defaultBranchName}/EXAMPLE#link)
[Just Hyperlink](#link)
[local-file.js](${node.url}/blob/${defaultBranchName}/local-file.js)`
                        : undefined,
            },
        },
    }

    nock(`${node.url}/raw/${defaultBranchName}`)
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
                `
# Project Title
README.md source :)
[Absolute URL](https://example.com)
![Image Relative URL 1](images/example1.png) ![Image Relative URL 2](images/example2.png)
[Just Relative URL](./EXAMPLE.md)
[Relative URL with Hyperlink](./EXAMPLE#link)
[Just Hyperlink](#link)
[local-file.js](local-file.js)`,
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
