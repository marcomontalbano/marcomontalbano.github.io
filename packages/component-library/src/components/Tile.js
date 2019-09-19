import React from 'react';
import PropTypes from 'prop-types';

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

Tile.propTypes = {
    src: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Tile;
