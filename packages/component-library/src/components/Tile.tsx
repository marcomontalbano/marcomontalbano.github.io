import React from 'react';

import './Tile.scss';

export type Props = {
    id: string,
    src: string,
    link: URL,
    title: string,
    description: string,
}

const Tile = ({ src, link, title, description }: Props) => (
    <a className="tile" href={link.href}>
        <img src={src} alt={title} />
        <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </a>
);

export default Tile;
