const nock = require('nock')
const fs = require('fs')

const { exportAsJson } = require('./index')

jest.mock('fs')

global.console = { log: jest.fn() }

const response = {
    data: {
        viewer: {
            repositories: {
                edges: [
                    {
                        node: {
                            name: 'kata.js',
                            description: 'A collection of katas with JavaScript.',
                            url: 'https://github.com/marcomontalbano/kata.js',
                            stargazers: {
                                totalCount: 2,
                            },
                            forkCount: 0,
                            repositoryTopics: {
                                edges: [
                                    {
                                        node: {
                                            topic: {
                                                name: 'kata',
                                            },
                                        },
                                    },
                                    {
                                        node: {
                                            topic: {
                                                name: 'tdd',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    },
}

describe('Dump GitHub - repositories', () => {
    const repositories = [...response.data.viewer.repositories.edges]
    const expectedResult = {
        ...repositories[0].node,
        customFields: {
            title: 'Kata JS',
            visible: false,
            starCount: 2,
            forkCount: 0,
            repositoryTopics: ['kata', 'tdd'],
            cover: {
                originalUrl: 'https://github.com/marcomontalbano/kata.js/raw/master/cover.png',
                url: 'https://github.com/marcomontalbano/kata.js/raw/master/cover.png',
                isPresent: false,
                headers: undefined,
                source: undefined,
            },
            readme: {
                originalUrl: 'https://github.com/marcomontalbano/kata.js/raw/master/README.md',
                url: 'https://github.com/marcomontalbano/kata.js/raw/master/README.md',
                isPresent: true,
                headers: {
                    'content-type': 'text/plain',
                },
                source: `# Kata JS
README.md source :)
[Absolute URL](https://example.com)
![Relative URL](https://github.com/marcomontalbano/kata.js/raw/master/images/example.png)`,
            },
        },
    }

    beforeEach(() => {
        nock('https://api.github.com')
            .persist()
            .post('/graphql')
            .reply(200, () => response)

        nock('https://github.com/marcomontalbano/kata.js/raw/master')
            .persist()
            .get(/README\.md/)
            .reply(
                200,
                () => `# Kata JS
README.md source :)
[Absolute URL](https://example.com)
![Relative URL](images/example.png)`,
                { 'content-type': 'text/plain' }
            )

        nock('https://github.com/marcomontalbano/kata.js/raw/master')
            .persist()
            .get(/package\.json/)
            .reply(200, () => 'package.json source :)', {
                'content-type': 'text/plain',
            })

        nock('https://github.com/marcomontalbano/kata.js/raw/master')
            .persist()
            .get(/cover\.png/)
            .reply(404)
    })

    afterEach(() => {
        nock.cleanAll()
    })

    describe('exportAsJson()', () => {
        it('should be able to enhance the repository object adding new properties', async () => {
            await exportAsJson('.')

            expect(fs.writeFileSync.mock.calls[0][0]).toMatch(/Repositories.json$/)
            expect(fs.writeFileSync.mock.calls[0][1]).toStrictEqual(JSON.stringify([expectedResult], undefined, 2))
        })
    })
})
