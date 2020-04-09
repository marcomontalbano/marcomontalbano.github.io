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


### Release

```sh
npm run lerna:version
```
