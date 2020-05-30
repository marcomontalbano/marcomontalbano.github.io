import React from 'react'
import styled from 'styled-components'

import { mediaQuery } from '@marcomontalbano/component-library'

type Props = {
    url: string
}

const Link = styled.a`
    position: absolute;
    top: -50px;
    right: 5px;

    img {
        display: block;
    }

    @media ${mediaQuery.medium} {
        top: -60px;
        right: 15px;
    }
`

const Hero = ({ url }: Props) => (
    <Link href={url}>
        <img
            src={`https://img.shields.io/badge/-GitHub-lightgray?color=2b3138&logoColor=949da5&logo=github&style=flat`}
        />
    </Link>
)

export default Hero
