const fs = require('fs-extra')
const path = require('path')

const packages = path.resolve('packages')

const getPackageInfo = (folderName) => {
    const folderPath = path.resolve(packages, folderName)

    const { name, publishConfig: { directory = '' } = {} } = require(path.resolve(folderPath, 'package.json'))

    const folders = {
        base: folderPath,
        dist: path.resolve(folderPath, directory),
        node_modules: path.resolve(folderPath, 'node_modules'),
    }

    return {
        name,
        folders,
    }
}

const copyDependency = (depSource, depDestination) => {
    const packageSource = getPackageInfo(depSource)
    const packageDestination = getPackageInfo(depDestination)

    const source = packageSource.folders.dist
    const destination = path.resolve(packageDestination.folders.node_modules, ...packageSource.name.split('/'))

    console.log(`COPY`, `./${path.relative('.', source)}`, '-->', `./${path.relative('.', destination)}`)

    fs.removeSync(destination)
    fs.copySync(source, destination)
}

copyDependency('component-library', 'website')
