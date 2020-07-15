import fs from 'fs'

import testUtility from '../testUtility.test'

import { exportAsJson } from './index'

jest.spyOn(global.console, 'log')

jest.mock('fs')
const mockedFs = fs as jest.Mocked<typeof fs>

describe('Dump GitHub - repositories', () => {
    describe('exportAsJson()', () => {
        beforeEach(() => {
            testUtility.nock.disableNetConnect()
        })

        afterEach(() => {
            mockedFs.writeFileSync.mockClear()
            testUtility.nock.cleanAll()
            testUtility.nock.enableNetConnect()
        })

        it('should be able to enhance the repository object adding new properties', async () => {
            const [node, expectedResult] = testUtility.nockNode('project-a', {
                readmeStatusCode: 200,
                coverStatusCode: 200,
            })
            testUtility.nockResponse([node])

            await exportAsJson('.')

            expect(mockedFs.writeFileSync.mock.calls[0][0]).toMatch(/Repositories.json$/)
            expect(mockedFs.writeFileSync.mock.calls[0][1]).toStrictEqual(
                JSON.stringify([expectedResult], undefined, 2)
            )
        })

        it('should not break if markdown is not found', async () => {
            const [node, expectedResult] = testUtility.nockNode('project-b', {
                readmeStatusCode: 404,
                coverStatusCode: 404,
            })
            testUtility.nockResponse([node])

            await exportAsJson('.')

            expect(mockedFs.writeFileSync.mock.calls[0][0]).toMatch(/Repositories.json$/)
            expect(mockedFs.writeFileSync.mock.calls[0][1]).toStrictEqual(
                JSON.stringify([expectedResult], undefined, 2)
            )
        })
    })
})
