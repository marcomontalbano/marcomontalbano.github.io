import React from 'react'

import Layout from '../components/layout'
import Container from '../components/container'
import SEO from '../components/seo'
import { Markdown } from '@marcomontalbano/component-library'

const SecondPage = (props: any) => {
    return (
        <Layout forceSolid={false}>
            <SEO title={props.pageContext.title} />
            <img style={{ marginTop: '-70px' }} src={props.pageContext.cover} alt={props.pageContext.title} />
            <Container style={{ marginTop: '1.45rem' }}>
                <Markdown markdown={props.pageContext.readme} />
            </Container>
        </Layout>
    )
}

export default SecondPage
