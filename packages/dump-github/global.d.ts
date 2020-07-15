type ghRepositoryTopic = {
    node: {
        topic: {
            name: string
        }
    }
}

type ghRepositoryTopics = {
    edges: ghRepositoryTopic[]
}

type ghFile = {
    originalUrl: string
    url: string
    isPresent: boolean
    headers?: { 'content-type': string | null }
    source?: string
}

type ghCustomFields = {
    title: string
    visible: boolean
    starCount: number
    forkCount: number
    defaultBranch: string
    repositoryTopics: string[]
    cover: ghFile
    readme: ghFile
}

type ghRepositoryInput = {
    name: string
    description: string
    url: string
    defaultBranchRef: { name: string }
    stargazers: { totalCount: number }
    repositoryTopics: ghRepositoryTopics
    forkCount: number
    isPrivate: boolean
    [key: string]: unknown
}

type ghRepositoryOutput = ghRepositoryInput & {
    customFields: ghCustomFields
}

type ghNode<T> = {
    node: T
}

type ghFileMode = 'raw' | 'blob'
