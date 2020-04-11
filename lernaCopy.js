const fs = require('fs-extra')
const path = require('path')

const packages = path.resolve('packages')

const getPackageInfo = (folderName) => {
    const folderPath = path.resolve(packages, folderName)

    const { name, files = [] } = require(path.resolve(folderPath, 'package.json'))

    const folders = {
        base: folderPath,
        node_modules: path.resolve(folderPath, 'node_modules'),
        files,
    }

    return {
        name,
        folders,
    }
}

const copyDependency = (depSource, depDestination) => {
    const packageSource = getPackageInfo(depSource)
    const packageDestination = getPackageInfo(depDestination)

    const { files } = packageSource.folders
    const destination = path.resolve(packageDestination.folders.node_modules, ...packageSource.name.split('/'))

    files.forEach((file) => {
        const fileSource = path.resolve(packageSource.folders.base, file)
        const fileDestination = path.resolve(destination, file)

        console.log(`COPY`, `./${path.relative('.', fileSource)}`, '-->', `./${path.relative('.', fileDestination)}`)

        fs.removeSync(fileDestination)
        fs.copySync(fileSource, fileDestination)
    })
}

copyDependency('component-library', 'website')
