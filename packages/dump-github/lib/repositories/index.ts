import path from 'path'
import fetch from 'node-fetch'
import showdown from 'showdown'

import { ghStoreAsJson } from '../utilities'

const converter = new showdown.Converter()

const createTopics = ({ edges = [] }: ghRepositoryTopics): string[] => edges.map((edge) => edge.node.topic.name)

const createFile = async (originalUrl: string): Promise<ghFile> => {
    const response = await fetch(originalUrl)
        // eslint-disable-next-line no-console
        .catch((error) => {
            throw new Error(`'There has been a problem with your fetch operation: ${error.message}`)
        })

    if (!response) {
        throw new Error(`'There has been a problem with your fetch operation: ${originalUrl}`)
    }

    const isPresent = response.ok
    const source =
        isPresent && response.headers.get('content-type')?.includes('text/plain') ? await response.text() : undefined
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

const getRepositoryUrl = (repositoryUrl: string, defaultBranch: string, mode: ghFileMode) => {
    const repositoryPath = mode ? `/${mode}/${defaultBranch}` : ''
    return `${repositoryUrl}${repositoryPath}`
}

const urlIsAbsolute = (url: string) => /^http.*/.test(url)

const urlHasOnlyHyperlink = (url: string) => /^#.*/.test(url)

const createMarkdown = async (repositoryUrl: string, defaultBranch: string, markdownUrl: string) => {
    const markdown = await createFile(markdownUrl)

    if (!markdown.source) {
        return markdown
    }

    const urlReplacer = (useRaw = false, format: string) => (match: string, url: string) => {
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

const create = async ({ node }: ghNode<ghRepositoryInput>): Promise<ghRepositoryOutput> => {
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
            readme: {
                ...readme,
                // source: ''
            },
        },
    }
}

export const exportAsJson = async (outputPath: string): Promise<void> =>
    ghStoreAsJson(
        path.resolve(__dirname, '..', '..', 'Repositories.graphql'),
        (data: any) => data.viewer.repositories.edges.map(create),
        outputPath
    )
