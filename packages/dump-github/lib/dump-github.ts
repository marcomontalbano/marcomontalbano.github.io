import { exportAsJson } from './repositories'

export const exportAll = async (outputPath = './'): Promise<void> => {
    await exportAsJson(outputPath)
}
