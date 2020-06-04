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

const getRepositoryUrl = (repositoryUrl, defaultBranch, mode) => {
    const repositoryPath = mode ? `/${mode}/${defaultBranch}` : ''
    return `${repositoryUrl}${repositoryPath}`
}

const urlIsAbsolute = (url) => /^http.*/.test(url)

const urlHasOnlyHyperlink = (url) => /^#.*/.test(url)

const createMarkdown = async (repositoryUrl, defaultBranch, markdownUrl) => {
    const markdown = await createFile(markdownUrl)

    if (!markdown.source) {
        return markdown
    }

    const urlReplacer = (useRaw = false, format) => (match, url) => {
        const absoluteUrl = `${getRepositoryUrl(repositoryUrl, defaultBranch, useRaw ? 'raw' : 'blob')}/${url.replace(
            /^[./]+/,
            ''
        )}`
        const urlWrapped = format === 'md' ? `(${url})` : url
        const absoluteUrlWrapped = format === 'md' ? `(${absoluteUrl})` : absoluteUrl
        return match.replace(
            urlWrapped,
            urlIsAbsolute(url) || urlHasOnlyHyperlink(url) ? urlWrapped : absoluteUrlWrapped
        )
    }

    const source = markdown.source
        .replace(/!\[[^\]]+\]\(([^)]+)\)/g, urlReplacer(true, 'md')) // markdown images
        .replace(/\[[^\]]+\]\(([^)]+)\)/g, urlReplacer(false, 'md')) // markdown links
        .replace(/src="([\S]+)"/g, urlReplacer(true, 'html')) // html images

    return { ...markdown, source }
}

const getTitle = (source = '') => {
    const html = converter.makeHtml(source)
    const [, h1] = html.match(/<h1 .*>(.*)<\/h1>/) || []
    return h1
}

const create = async ({ node }) => {
    const repositoryRawUrl = getRepositoryUrl(node.url, node.defaultBranchRef.name, 'raw')

    const cover = await createFile(`${repositoryRawUrl}/cover.png`)
    const readme = await createMarkdown(node.url, node.defaultBranchRef.name, `${repositoryRawUrl}/README.md`)

    return {
        ...node,
        customFields: {
            title: getTitle(readme.source) || node.name,
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
