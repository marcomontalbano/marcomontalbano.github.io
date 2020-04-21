const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const { NODE_ENV, GITHUB_TOKEN } = process.env
const isProduction = NODE_ENV === 'production'

const ghRunQuery = (query) =>
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
    }).then((response) => response.json())

const ghGetData = async (graphqlPath, transformer) => {
    const json = await ghRunQuery(fs.readFileSync(graphqlPath, 'utf8'))

    if (json.message) {
        throw new Error(json.message)
    }

    if (json.errors) {
        throw new Error(json.errors[0].message)
    }

    const { data } = json
    const output = await Promise.all(transformer(data))

    return output
}

const ghStoreAsJson = async (graphqlPath, transformer, outputPath) => {
    const data = await ghGetData(graphqlPath, transformer)
    const resolvedOutputPath = path.resolve(outputPath, `${path.basename(graphqlPath, '.graphql')}.json`)

    const dataAsString = JSON.stringify(data, undefined, isProduction ? undefined : 2)

    fs.writeFileSync(resolvedOutputPath, dataAsString, 'utf8')

    // eslint-disable-next-line no-console
    console.log(`Built database in ${resolvedOutputPath}`)
}

module.exports = {
    ghStoreAsJson,
}
