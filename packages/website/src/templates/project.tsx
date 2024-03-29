import React from 'react'

import Layout from '../components/layout'
import Container from '../components/container'
import SEO from '../components/seo'
import Hero from '../components/project/hero'
import HeroLinks from '../components/project/heroLinks'
import { Markdown } from '@marcomontalbano/component-library'

const ProjectPage = (props: any) => {
    return (
        <Layout forceSolid={false}>
            <SEO title={props.pageContext.title} />
            <Hero cover={props.pageContext.cover} title={props.pageContext.title} />
            <Container style={{ marginTop: '1.45rem' }}>
                <HeroLinks {...props} />
                <Markdown markdown={props.pageContext.readme} />
            </Container>
        </Layout>
    )
}

export default ProjectPage
