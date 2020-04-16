const nock = require('nock')

const { createRepository, sanitize } = require('./utilities')

const response = {
    data: {
        viewer: {
            login: 'marcomontalbano',
            name: 'Marco Montalbano',
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

describe('Dump GitHub - utilities', () => {
    const repositories = [...response.data.viewer.repositories.edges]
    const expectedResult = {
        ...repositories[0].node,
        title: 'Kata JS',
        visible: false,
        starCount: 2,
        repositoryTopics: ['kata', 'tdd'],
        files: {
            'README.md': {
                url: 'https://github.com/marcomontalbano/kata.js/raw/master/README.md',
                isPresent: true,
                headers: {
                    'content-type': 'text/plain',
                },
                source: '# Kata JS\nREADME.md source :)',
                html: '<h1 id="katajs">Kata JS</h1>\n<p>README.md source :)</p>',
            },
            'package.json': {
                url: 'https://github.com/marcomontalbano/kata.js/raw/master/package.json',
                isPresent: true,
                headers: {
                    'content-type': 'text/plain',
                },
                source: 'package.json source :)',
            },
            'cover.png': {
                url: 'https://github.com/marcomontalbano/kata.js/raw/master/cover.png',
                isPresent: false,
                headers: undefined,
                source: undefined,
            },
        },
    }

    beforeEach(() => {
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

    describe('createRepository()', () => {
        it('should be able to enhance the repository object adding new properties', async () => {
            nock('https://github.com/marcomontalbano/kata.js/raw/master')
                .persist()
                .get(/README\.md/)
                .reply(200, () => '# Kata JS\nREADME.md source :)', {
                    'content-type': 'text/plain',
                })

            expect(await createRepository(repositories[0])).toStrictEqual(expectedResult)
        })

        it('should be able to enhance the repository object adding new properties', async () => {
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

            expect(await createRepository(repositories[0])).toStrictEqual({
                ...expectedResult,
                files: {
                    ...expectedResult.files,
                    'README.md': {
                        url: 'https://github.com/marcomontalbano/kata.js/raw/master/README.md',
                        isPresent: true,
                        headers: {
                            'content-type': 'text/plain',
                        },
                        source: `# Kata JS
README.md source :)
[Absolute URL](https://example.com)
![Relative URL](https://github.com/marcomontalbano/kata.js/raw/master/images/example.png)`,
                        html: `<h1 id="katajs">Kata JS</h1>
<p>README.md source :)
<a href="https://example.com">Absolute URL</a>
<img src="https://github.com/marcomontalbano/kata.js/raw/master/images/example.png" alt="Relative URL" /></p>`,
                    },
                },
            })
        })
    })

    describe('sanitize()', () => {
        it('should clean up the response from graphql query', async () => {
            nock('https://github.com/marcomontalbano/kata.js/raw/master')
                .persist()
                .get(/README\.md/)
                .reply(200, () => '# Kata JS\nREADME.md source :)', {
                    'content-type': 'text/plain',
                })

            expect(await sanitize(response)).toStrictEqual({
                login: 'marcomontalbano',
                name: 'Marco Montalbano',
                repositoryCount: 1,
                repositories: {
                    'kata.js': {
                        ...(await createRepository(response.data.viewer.repositories.edges[0])),
                    },
                },
            })
        })
    })
})
