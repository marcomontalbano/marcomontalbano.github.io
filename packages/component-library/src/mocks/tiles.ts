const repositories = require('./Repositories.json')

const visibleRepositories = repositories.filter((repository: any) => repository.customFields.visible)

export default visibleRepositories.map((repository: any) => {
    return {
        id: repository.name,
        title: repository.customFields.title,
        description: repository.description || '',
        src: repository.customFields.cover.url,
        link: repository.url,
        readme: repository.customFields.readme,
    }
})
