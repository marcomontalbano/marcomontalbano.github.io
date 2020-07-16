/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import { GlobalStyle, Header } from '@marcomontalbano/component-library'

import './layout.css'

type Props = {
    children: any
    forceSolid?: boolean
}

const Layout = ({ children, forceSolid = true }: Props) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <GlobalStyle>
            <Header
                gradientStart={200}
                gradientEnd={180}
                forceSolid={forceSolid}
                title={<Link to="/">{data.site.siteMetadata.title}</Link>}
            >
                <a href="https://github.com/marcomontalbano">GitHub</a>
                <a href="https://marcomontalbano.github.io/curriculum/curriculum-marco-montalbano.pdf">CV</a>
            </Header>
            <main>{children}</main>
        </GlobalStyle>
    )
}

export default Layout
