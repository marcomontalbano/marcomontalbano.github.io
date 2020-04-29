/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const { data } = await graphql(`
        query {
            allRepositories(filter: { customFields: { visible: { eq: true } } }) {
                nodes {
                    createdAt
                    name
                    description
                    url
                    customFields {
                        title
                        cover {
                            url
                        }
                        forkCount
                        starCount
                        repositoryTopics
                        readme {
                            source
                        }
                    }
                }
            }
        }
    `)

    data.allRepositories.nodes.forEach((node) => {
        createPage({
            path: `/project/${node.name}`,
            component: path.resolve(`src/pages/project.tsx`),
            context: {
                name: node.name,
                title: node.customFields.title,
                cover: node.customFields.cover.url,
                readme: node.customFields.readme.source,
            },
        })
    })
}
