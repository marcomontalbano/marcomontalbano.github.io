const ora = require('ora')
const chalk = require('chalk')

const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')

const packages = path.resolve('packages')

const spinner = ora()

const getPackageInfo = (folderName) => {
    const folderPath = path.resolve(packages, folderName)

    const { name, files = [], peerDependencies = {} } = require(path.resolve(folderPath, 'package.json'))

    const folders = {
        base: folderPath,
        node_modules: path.resolve(folderPath, 'node_modules'),
        defaultFiles: ['package.json'],
        files,
    }

    return {
        name,
        folders,
        peerDependencies: Object.keys(peerDependencies),
    }
}

const removeFiles = (basepath, files) => {
    return Promise.all(files.map((file) => fs.remove(path.resolve(basepath, file))))
}

const copyFiles = (files, source, destination) => {
    return Promise.all(
        files.map((file) => {
            const fileSource = path.resolve(source, file)
            const fileDestination = path.resolve(destination, file)
            const message = chalk.cyanBright(
                'COPY',
                chalk.cyan(path.relative('./', fileSource)),
                '→',
                chalk.cyan(path.relative('./', fileDestination))
            )

            spinner.text = message

            return fs.copy(fileSource, fileDestination).then(() => spinner.succeed(message).start())
        })
    )
}

const copyDependency = async (depSource, depDestination, isSetup) => {
    console.log(
        chalk.blueBright(
            'Link',
            chalk.bold(depSource),
            'into',
            chalk.bold(depDestination),
            isSetup ? '(first setup)' : undefined
        )
    )
    spinner.start()

    const packageSource = getPackageInfo(depSource)
    const packageDestination = getPackageInfo(depDestination)

    const destinationPath = path.resolve(packageDestination.folders.node_modules, ...packageSource.name.split('/'))
    console.log(destinationPath)

    // remove lerna symlink
    if (fs.existsSync(destinationPath)) {
        if (fs.lstatSync(destinationPath).isSymbolicLink()) {
            fs.removeSync(destinationPath)
        }

        await removeFiles(destinationPath, packageSource.folders.files)
    }

    // copy each "source.files"
    await copyFiles(packageSource.folders.files, packageSource.folders.base, destinationPath)

    if (isSetup === true) {
        // copy defaultFiles from source to destination
        await removeFiles(destinationPath, packageSource.folders.defaultFiles)
        await copyFiles(packageSource.folders.defaultFiles, packageSource.folders.base, destinationPath)

        // install all production dependencies
        const relativeDestinationPath = path.relative('.', destinationPath)
        spinner.text = chalk.cyanBright(`npm install --production ./${relativeDestinationPath}`)
        await new Promise((resolve, reject) => {
            exec(`npm --prefix ${destinationPath} install --production ${destinationPath}`, (error) => {
                if (error) {
                    return reject()
                }

                spinner.succeed()
                return resolve()
            })
        })
    }
}

const [cmd, script, isSetup = 'true'] = process.argv

copyDependency('component-library', 'website', isSetup === 'true').then(() => {
    spinner.stop()
    console.log(chalk.greenBright('Done 🎉'))
})
