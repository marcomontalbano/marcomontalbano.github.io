const fs = require('fs')

const { nock, nockNode, nockResponse } = require('../testUtility.test')

const { exportAsJson } = require('./index')

jest.mock('fs')

global.console = { log: jest.fn() }

describe('Dump GitHub - repositories', () => {
    describe('exportAsJson()', () => {
        beforeEach(() => {
            nock.disableNetConnect()
        })

        afterEach(() => {
            fs.writeFileSync.mockClear()
            nock.cleanAll()
            nock.enableNetConnect()
        })

        it('should be able to enhance the repository object adding new properties', async () => {
            const [node, expectedResult] = nockNode('project-a', { readmeStatusCode: 200, coverStatusCode: 200 })
            nockResponse([node])

            await exportAsJson('.')

            expect(fs.writeFileSync.mock.calls[0][0]).toMatch(/Repositories.json$/)
            expect(fs.writeFileSync.mock.calls[0][1]).toStrictEqual(JSON.stringify([expectedResult], undefined, 2))
        })

        it('should not break if markdown is not found', async () => {
            const [node, expectedResult] = nockNode('project-b', { readmeStatusCode: 404, coverStatusCode: 404 })
            nockResponse([node])

            await exportAsJson('.')

            expect(fs.writeFileSync.mock.calls[0][0]).toMatch(/Repositories.json$/)
            expect(fs.writeFileSync.mock.calls[0][1]).toStrictEqual(JSON.stringify([expectedResult], undefined, 2))
        })
    })
})
