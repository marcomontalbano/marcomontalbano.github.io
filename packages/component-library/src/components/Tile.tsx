import React from 'react'
import styled from 'styled-components'

import { StyledComponents } from '../types'

export type Props = {
    id: string
    src: string
    link: string
    title: string
    description: string
}

const Tile = ({ className, src, link, title, description }: Props & StyledComponents) => (
    <a href={link} className={className}>
        <img src={src} alt={title} />
        <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </a>
)

const cssVariables = {
    lineHeight: 1.2,
    lineClamp: 3,
}

export default styled(Tile)`
    position: relative;
    display: block;

    &:before {
        content: '';
        background: rgb(0, 0, 0);
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    }

    &:before,
    .content {
        opacity: 0;
        transition: 0.3s opacity;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
    }

    .content {
        padding: 25px;
        height: auto;
        box-sizing: border-box;
        color: white;

        > h2 {
            margin: 0;
        }

        > p {
            margin: 10px 0 0;
            line-height: ${cssVariables.lineHeight}em;
            max-height: ${(cssVariables.lineHeight * cssVariables.lineClamp).toFixed(2)}em;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: ${cssVariables.lineClamp};
            -webkit-box-orient: vertical;
        }
    }

    &:hover {
        &:before,
        .content {
            opacity: 1;
        }
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
