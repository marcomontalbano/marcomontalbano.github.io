const repositories = require('./repositories')

module.exports = {
    exportAll: async (outputPath = './') => {
        await repositories.exportAsJson(outputPath)
    },
}
