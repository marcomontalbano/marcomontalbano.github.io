import { z } from 'astro/zod'

const { GITHUB_TOKEN } = process.env

export const ghRunQuery = async () => {
  const data = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          viewer {
            repositories(first: 100, affiliations: OWNER, privacy: PUBLIC, orderBy: { field: CREATED_AT, direction: DESC }) {
              edges {
                node {
                  name
                  description
                  url
                  defaultBranchRef {
                    name
                  }
                  homepageUrl
                  createdAt
                  updatedAt
                  pushedAt
                  isFork
                  isLocked
                  isMirror
                  isPrivate
                  isArchived
                  isDisabled
                  isTemplate
                  usesCustomOpenGraphImage
                  openGraphImageUrl
                  stargazers {
                    totalCount
                  }
                  forkCount
                  repositoryTopics(first: 100) {
                    edges {
                      node {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    }),
  }).then((response) => response.json())

  const schema = z.object({
    data: z.object({
      viewer: z.object({
        repositories: z.object({
          edges: z.object({
            node: z.object({
              /** Repository name */
              name: z.string(),
              description: z.string().nullable(),
              url: z.string(),
              defaultBranchRef: z.object({
                name: z.string()
              }),
              homepageUrl: z.string().nullable(),
              createdAt: z.string().transform(value => new Date(value)),
              updatedAt: z.string().transform(value => new Date(value)),
              pushedAt: z.string().transform(value => new Date(value)),
              isFork: z.boolean(),
              isLocked: z.boolean(),
              isMirror: z.boolean(),
              isPrivate: z.boolean(),
              isArchived: z.boolean(),
              isDisabled: z.boolean(),
              isTemplate: z.boolean(),
              usesCustomOpenGraphImage: z.boolean(),
              openGraphImageUrl: z.string(),
              stargazers: z.object({
                totalCount: z.number()
              }),
              forkCount: z.number(),
              repositoryTopics: z.object({
                edges: z.object({
                  node: z.object({
                    topic: z.object({
                      name: z.string()
                    })
                  })
                }).array()
              }).transform(repositoryTopics => repositoryTopics.edges.map(edge => edge.node.topic.name))
            })
              .passthrough()
              .transform(async (repository) => {
                const repositoryUrl = `${repository.url}/raw/${repository.defaultBranchRef.name}`
                const cover = await fetchFile(`${repositoryUrl}/cover.png`)
                const readme = await fetchMarkdown(repository.url, repository.defaultBranchRef.name,`${repositoryUrl}/README.md`)
                const visible =
                  cover.ok &&
                  readme.ok &&
                  !repository.isPrivate

                return {
                  ...repository,
                  customFields: {
                    visible,
                    starCount: repository.stargazers.totalCount,
                    forkCount: repository.forkCount,
                    defaultBranch: repository.defaultBranchRef.name,
                    topics: repository.repositoryTopics,
                    cover,
                    readme
                  }
                }
              })
          }).array()
        })
      })
    })
  }).transform(({ data }) => data.viewer.repositories.edges.map(edge => edge.node))

  return await schema.parseAsync(data)
}

const fetchFile = async (originalUrl: string): Promise<ghFile> => {
  const response = await fetch(originalUrl)
    .catch((error) => {
      throw new Error(`'There has been a problem with your fetch operation: ${error.message}`)
    })

  const { url, ok } = response

  if (!ok) {
    return {
      ok,
      url: originalUrl,
      cdn: url
    }
  }

  const contentType = response.headers.get('content-type')
  const source = contentType?.includes('text/plain')
    ? await response.text()
    : undefined

  if (contentType == null) {
    return {
      ok: false,
      url: originalUrl,
      cdn: url
    }
  }

  return {
    ok,
    url: originalUrl,
    cdn: url,
    contentType,
    source,
  }
}

const fetchMarkdown = async (repositoryUrl: string, defaultBranch: string, markdownUrl: string) => {
  const markdown = await fetchFile(markdownUrl)

  if (!markdown.ok || markdown.source == null) {
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

const getRepositoryUrl = (repositoryUrl: string, defaultBranch: string, mode: ghFileMode) => {
  const repositoryPath = mode ? `/${mode}/${defaultBranch}` : ''
  return `${repositoryUrl}${repositoryPath}`
}

const urlIsAbsolute = (url: string) => /^http.*/.test(url)

const urlHasOnlyHyperlink = (url: string) => /^#.*/.test(url)

type ghFile = {
  url: string
  cdn: string
} & ({
  ok: false
} | {
  ok: true
  contentType: string
  source?: string
})

type ghFileMode = 'raw' | 'blob'
