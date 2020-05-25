module.exports = {
    siteMetadata: {
        title: `Marco Montalbano`,
        description: `Hi everyone, my name is Marco Montalbano and I'm a web developer. On this site you can discover more about me, my projects, my work and my curriculum.`,
        author: `@montalbanomarco`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#559CD0`,
                theme_color: `#559CD0`,
                display: `minimal-ui`,
                icon: `src/images/favicon-light.png`,
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Lato`,
                        variants: [`300`, `700`],
                    },
                    {
                        family: `Spinnaker`,
                    },
                ],
            },
        },
        `gatsby-plugin-typescript`,
        `gatsby-plugin-typescript-checker`,
        `gatsby-plugin-styled-components`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,

        {
            resolve: `gatsby-transformer-json`,
            options: {
                typeName: ({ node, object, isArray }) => node.name,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/../../data/`,
            },
        },
    ],
}
