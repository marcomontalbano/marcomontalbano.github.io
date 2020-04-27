import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { TileList } from '@marcomontalbano/component-library'

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

    const projects = nodes.map((node: any) => ({
        id: node.name,
        title: node.customFields.title,
        description: node.description,
        src: node.customFields.cover.url,
        link: `/project/${node.name}`,
    }))

    return projects
}

const IndexPage = (props: any) => {
    const projects = useProjects()

    return (
        <Layout>
            <SEO title="Home" />
            <TileList tiles={projects} />
        </Layout>
    )
}

export default IndexPage
