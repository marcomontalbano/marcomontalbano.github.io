# marcomontalbano.github.io


## General Information

This project is composed by 3 packages. I'm using [lerna](https://github.com/lerna/lerna) to manage this monorepo.

* `dump-github` fetches the GitHub API v4, manipulate the data and create multiple json files that then are consumed by the `website`.
* `component-library` is a [Storybook](https://storybook.js.org/) project. All components are available as downloadable [npm package](https://github.com/marcomontalbano/marcomontalbano.github.io/packages/79405).
* `website` uses components from the *component-library*, consumes data from *dump-github* and builds the website using [Gatsby](https://www.gatsbyjs.org/).

## Environment Variables

You need to set a `GITHUB_TOKEN` environment variable with `repo` scope.

## Scripts

I created many scripts in the root folder, so that it is easier to execute them without moving back and forth between folders.

### General

* `clean` - Clean all the auto-generated folder and files in all packages
* `install` - Install root folder dependencies.
* `postinstall` - Install dependencies from each packages.
* `test` - Run tests in all packages
* `lint` - Run lint in all packages

### Dump Github

* `db:build` - Fetch GitHub API and export data into multiple json files inside `./data` folder

### Component Library

* `componentLibrary:start` - Start *storybook* at http://localhost:9009/
* `componentLibrary:watch` - Watch for changes and build the `component-library`
* `componentLibrary:build` - Build the component-library producing a `dist` folder that contains all reusable components.

### Website

* `prewebsite:start` - Build *dump-github* and *component-library*.
* `website:start` - Start *gatsby* at http://localhost:8000/


## Release Life Cycle

### General Rules

1. Create a pull request for each development
1. Add a label to each pull request

### Component Library

1. Create a new version from `production` with `npm run lerna:version`
1. `release.yml` workflow will attach the release notes to a brand new draft release
1. [ *only pre-release* ] Flag the release with `This is a pre-release`
1. Manually publish the release from GitHub
1. `publish.yml` workflow will publish the release to [GitHub registry](https://github.com/marcomontalbano/marcomontalbano.github.io/packages) and start the build on Netlify

### Website

1. When you manually publish the release from GitHub, the `gh-pages.yml` workflow will be triggered also. This will deploy the website on [GitHub Pages](https://pages.github.com/)
1. `gh-pages.yml` is also triggered on scheduled time. In this flow, the last available *tag* will be deployed.
