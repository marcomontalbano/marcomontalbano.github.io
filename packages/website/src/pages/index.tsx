import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

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

const Background = styled.div`
    position: relative;
    margin-bottom: -100px;
    z-index: -1;
    height: 40vh;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(6px);

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(255, 255, 255);
        background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }
`

const IndexPage = () => {
    const projects = useProjects()

    return (
        <Layout forceSolid={false}>
            <SEO />
            <Background />
            <TileList tiles={projects} />
        </Layout>
    )
}

export default IndexPage
