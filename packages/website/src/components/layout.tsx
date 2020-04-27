/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Page, Header } from '@marcomontalbano/component-library'

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
        <Page>
            <Header title={data.site.siteMetadata.title} forceSolid={forceSolid} />
            <main>{children}</main>
        </Page>
    )
}

export default Layout
