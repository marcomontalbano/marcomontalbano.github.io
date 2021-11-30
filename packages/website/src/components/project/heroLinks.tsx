import React from 'react'
import styled from 'styled-components'

import { mediaQuery } from '@marcomontalbano/component-library'

const HeroLinks = styled.div`
    position: absolute;
    top: -50px;
    right: 5px;

    > a {
        display: inline-block;
        margin: 0 4px;
    }

    img {
        display: block;
    }

    @media ${mediaQuery.medium} {
        top: -60px;
        right: 15px;
    }
`

export default (props: any) => (
    <HeroLinks>
        {props.pageContext.homepageUrl && (
            <a href={props.pageContext.homepageUrl}>
                <img
                    alt="Website"
                    src={`https://img.shields.io/badge/-Website-lightgray?color=039be5&logoColor=ffffff&style=flat`}
                />
            </a>
        )}
        <a href={props.pageContext.url}>
            <img
                alt="GitHub"
                src={`https://img.shields.io/badge/-GitHub-lightgray?color=2b3138&logoColor=949da5&logo=github&style=flat`}
            />
        </a>
    </HeroLinks>
)
