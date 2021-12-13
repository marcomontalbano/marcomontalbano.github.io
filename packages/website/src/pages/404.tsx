import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import WelcomeHero from '../components/welcomeHero'

const Centered = styled.div`
    text-align: center;
    margin-top: 100px;
`

const NotFoundPage = () => (
    <Layout forceSolid={false}>
        <SEO title="404: Not found" />
        <WelcomeHero style={{ position: 'absolute' }} />
        <Centered>
            <img src="/404.svg" alt="404 image" />
            <p>We can't find the page that you're looking for.</p>
        </Centered>
    </Layout>
)

export default NotFoundPage
