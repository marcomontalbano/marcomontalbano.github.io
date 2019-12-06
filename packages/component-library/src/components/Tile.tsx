import React from 'react';
import styled from 'styled-components';
import StyledComponentsType from './StyledComponentsType';

export type TileProps = {
    id: string,
    src: string,
    link: URL,
    title: string,
    description: string,
};

const Tile = ({ className, src, link, title, description }: TileProps & StyledComponentsType) => (
    <a href={link.href} className={className}>
        <img src={src} alt={title} />
        <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </a>
);

export default styled(Tile)`
    position: relative;
    display: block;

    &:before {
        content: "";
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,0.6825105042016807) 0%, rgba(0,212,255,0) 100%);
    }

    &:before, .content {
        opacity: 0;
        transition: .3s opacity;
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
            $line-height: 1.2em;
            $line-clamp: 3;
            margin: 10px 0 0;
            line-height: $line-height;
            max-height: $line-height * $line-clamp;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: $line-clamp;
            -webkit-box-orient: vertical;
        }
    }

    &:hover {
        &:before, .content {
            opacity: 1;
        }
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
