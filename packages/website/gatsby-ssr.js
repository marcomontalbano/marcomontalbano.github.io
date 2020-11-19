/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link rel="preconnect" href="https://fonts.gstatic.com" />,
        <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700&amp;family=Spinnaker&amp;display=swap"
            rel="stylesheet"
        />,
    ])
}
