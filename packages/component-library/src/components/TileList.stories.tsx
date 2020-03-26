import React from 'react'

import TileList from './TileList'

import tiles from '../mocks/tiles'

export default {
    title: 'TileList',
}

export const basic = () => <TileList tiles={tiles} />
