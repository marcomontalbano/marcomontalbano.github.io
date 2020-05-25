import React from 'react'
import styled from 'styled-components'

import { StyledComponents } from '../types'

export type Props = {
    id: string
    src: string
    title: string
    description: string
    Wrapper?: (props: React.PropsWithChildren<{}>) => JSX.Element
}

const Tile = ({
    className,
    src,
    title,
    description,
    Wrapper = ({ children }) => <div>{children}</div>,
}: Props & StyledComponents) => (
    <div className={className}>
        <Wrapper>
            <img src={src} alt={title} />
            <div className="content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </Wrapper>
    </div>
)

const cssVariables = {
    lineHeight: 1.2,
    lineClamp: 3,
}

export default styled(Tile)`
    overflow: hidden;
    > * {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;

        &:after {
            content: '';
            background: rgb(0, 0, 0);
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
            background: rgba(0, 0, 0, 0.4);
        }

        &:after,
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
            padding: 1.2em;
            height: auto;
            box-sizing: border-box;
            color: white;
            z-index: 1;

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

        img {
            transition: 0.2s transform;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1);
        }

        &:hover {
            &:after,
            .content {
                opacity: 1;
            }

            img {
                transform: scale(1.02);
            }
        }
    }
`
