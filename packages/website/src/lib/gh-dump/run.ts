/**
 * Fetches the data from the GitHub API and dumps it into a JSON file.
 *
 * @note This script is executed in the `pnpm build:data` script.
 */

import { ghRunQuery } from './gh'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const repositories = (await ghRunQuery())
  .filter(repositories => repositories.customFields.visible)

repositories.forEach((repository) => {
  if (repository.customFields.readme.ok && repository.customFields.readme.source != null) {
    const file = resolve(process.cwd(), 'src', 'content', 'project', `${repository.name}.md`)
    const data = `---
slug: "${repository.name.replaceAll('\"', '\\"') }"
description: "${repository.description?.replaceAll('\"', '\\"') }"
cover: ${repository.customFields.cover.cdn}
repoUrl: ${repository.url}
homepageUrl: ${repository.homepageUrl}
createdAt: ${repository.createdAt.toJSON()}
updatedAt: ${repository.updatedAt.toJSON()}
tags: ${JSON.stringify(repository.repositoryTopics)}
---

${repository.customFields.readme.source}
`
    writeFileSync(file, data)
  }
})

process.exit(0)
