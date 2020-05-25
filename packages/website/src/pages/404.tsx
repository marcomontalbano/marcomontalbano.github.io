import React from 'react'

import Layout from '../components/layout'
import Container from '../components/container'
import SEO from '../components/seo'

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <Container>
            <h1>NOT FOUND</h1>
            <p>You just hit a route that doesn't exist.</p>
        </Container>
    </Layout>
)

export default NotFoundPage
