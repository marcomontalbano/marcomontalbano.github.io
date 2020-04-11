# portfolio

## Toolkit

* lerna
* eslint
* jest

### Lerna

> Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.
https://github.com/lerna/lerna

`npm run lerna:create <name> -- --bin`

`npm run lerna:bootstrap`

`npm run build`

`npm run build -- --scope @marcomontalbano/dump-github`

### GitHub Packages

Useful links

* https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages


## Release Life Cycle

### General Rules

1. Create a pull request for each development
1. Add a label to each pull request

### Component Library

1. Create a new version from `master` with `npm run lerna:version`
1. `release` workflow will attach the release notes to a brand new draft release
1. [ *only pre-release* ] Flag the release with `This is a pre-release`
1. Manually publish the release from GitHub
1. `publish` workflow will publish the release to [GitHub registry](https://github.com/marcomontalbano/marcomontalbano.github.io/packages) and start the build on Netlify

### Website

> Be sure to publish the `component-library` before.

1. Run `npm run website:update` to update the `component-library` to the latest published version
1. If you want to double-check the website before deploying it, you can use `npm run website:build` and `npm run website:serve`.
    A production copy of the website will be available at http://localhost:9000/
1. Commit and push the updated `package.json` and `package-lock.json`
1. Merge `master` into `production` branch
