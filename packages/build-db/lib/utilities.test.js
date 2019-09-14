const nock = require('nock');

const { createRepository, sanitize } = require('./utilities');

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
};

describe('Build DB - utilities', () => {
    beforeEach(() => {
        nock('https://github.com/marcomontalbano/kata.js/raw/master')
            .persist()
            .get(/README\.md|package\.json/)
            .reply(200, (uri) => `${uri.substring(uri.lastIndexOf('/') + 1)} source :)`, {
                'content-type': 'text/plain',
            });

        nock('https://github.com/marcomontalbano/kata.js/raw/master')
            .persist()
            .get(/cover\.png/)
            .reply(404);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('createRepository() should be able to enhance the repository object adding new properties', async () => {
        const repositories = [...response.data.viewer.repositories.edges];
        expect(await createRepository(repositories[0])).toStrictEqual({
            ...repositories[0].node,
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
                    source: 'README.md source :)',
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
        });
    });

    it('sanitize() should clean up the response from graphql query', async () => {
        // const repositories = [...response.data.viewer.repositories.edges];
        const repositories = {
            'kata.js': {
                ...await createRepository(response.data.viewer.repositories.edges[0]),
            },
        };

        expect(await sanitize(response)).toStrictEqual({
            login: 'marcomontalbano',
            name: 'Marco Montalbano',
            repositoryCount: 1,
            repositories,
        });
    });
});