const path = require('path')
const fetch = require('node-fetch')
const showdown = require('showdown')

const utilities = require('../utilities')

const converter = new showdown.Converter()

const createTopics = ({ edges = [] }) => edges.map((edge) => edge.node.topic.name)

const createFile = async (originalUrl) => {
    const response = await fetch(originalUrl)
        // eslint-disable-next-line no-console
        .catch((error) => console.info(`'There has been a problem with your fetch operation: ${error.message}`))

    const isPresent = response.ok
    const source =
        isPresent && response.headers.get('content-type').includes('text/plain') ? await response.text() : undefined
    const headers = isPresent
        ? {
              'content-type': response.headers.get('content-type'),
          }
        : undefined

    const { url } = response

    return {
        originalUrl,
        url,
        isPresent,
        headers,
        source,
    }
}

const createMarkdown = async (repositoryUrl, markdownUrl) => {
    const markdown = await createFile(markdownUrl)

    if (!markdown.source) {
        return markdown
    }

    const replacement = (match, url) => {
        const isRelative = !/^http.*/g.test(url)
        return match.replace(url, isRelative ? `${repositoryUrl}/${url.replace(/^[./]+/, '')}` : url)
    }

    const source = markdown.source
        .replace(/\]\(([^)]+)\)/g, replacement) // markdown link
        .replace(/src="([\S]+)"/g, replacement) // html link

    return { ...markdown, source }
}

const getH1 = (source = '') => {
    const html = converter.makeHtml(source)
    const [, h1] = html.match(/<h1 .*>(.*)<\/h1>/) || []
    return h1
}

const create = async ({ node }) => {
    const repositoryUrl = `${node.url}/raw/${node.defaultBranchRef.name}`

    const cover = await createFile(`${repositoryUrl}/cover.png`)
    const readme = await createMarkdown(repositoryUrl, `${repositoryUrl}/README.md`)

    return {
        ...node,
        customFields: {
            title: getH1(readme.source) || node.name,
            visible: cover.isPresent === true && readme.isPresent === true && node.isPrivate === false,
            starCount: node.stargazers.totalCount,
            forkCount: node.forkCount,
            defaultBranch: node.defaultBranchRef.name,
            repositoryTopics: createTopics(node.repositoryTopics),
            cover,
            readme,
        },
    }
}

const exportAsJson = async (outputPath) =>
    utilities.ghStoreAsJson(
        path.resolve(__dirname, 'Repositories.graphql'),
        (data) => data.viewer.repositories.edges.map(create),
        outputPath
    )

module.exports = {
    exportAsJson,
}
