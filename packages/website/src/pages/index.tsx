import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { TileList, TileProps } from '@marcomontalbano/component-library'

const useProjects = () => {
    const data = useStaticQuery(graphql`
        query {
            allRepositories(filter: { customFields: { visible: { eq: true } } }) {
                nodes {
                    name
                    url
                    createdAt
                    customFields {
                        cover {
                            url
                        }
                        forkCount
                        starCount
                        repositoryTopics
                        title
                        readme {
                            source
                        }
                    }
                    description
                }
            }
        }
    `)

    const {
        allRepositories: { nodes },
    } = data

    const projects: TileProps[] = nodes.map(
        (node: any): TileProps => ({
            id: node.name,
            title: node.customFields.title,
            description: node.description,
            src: node.customFields.cover.url,
            Wrapper: ({ children }) => <Link to={`/project/${node.name}`}>{children}</Link>,
        })
    )

    return projects
}

const IndexPage = () => {
    const projects = useProjects()

    return (
        <Layout>
            <SEO title="Home" />
            <TileList tiles={projects} />
        </Layout>
    )
}

export default IndexPage
