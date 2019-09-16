import React from 'react';

import './Tile.scss';

const Tile = ({ src, href, title, description }) => {

    return (
        <a className="tile" href={href}>
            <img src={src} alt={title} />
            <div className="content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </a>
    );
}

export default Tile;
