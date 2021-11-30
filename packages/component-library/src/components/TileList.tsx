import styled, { css } from 'styled-components'

import { StyledComponents } from '../types'
import Tile, { Props as TileProps } from './Tile'

export type Props = {
    tiles: TileProps[]

    /**
     * Show first tile as hero
     */
    hero?: boolean
}

const TileList = ({ className, tiles }: Props & StyledComponents) => (
    <div className={className}>
        {tiles.map((tile) => (
            <Tile key={tile.id} {...tile} />
        ))}
    </div>
)

export default styled(TileList)`
    display: flex;
    flex-wrap: wrap;

    > ${Tile} {
        flex: 1 1 512px;
        margin: 20px;

        border-radius: 5px;
        box-shadow: 1px 1px 8px -4px black;

        ${(props) =>
            props.hero &&
            css`
                &:first-child {
                    flex: 100%;
                    margin: 0 -20px 20px;
                    margin: 0 0 20px;
                    border-radius: 0;

                    min-height: 50vh;
                    max-height: 80vh;

                    > * {
                        &:after {
                            display: none;
                        }

                        .content {
                            opacity: 1;
                            background: rgba(0, 0, 0, 0.4);
                        }

                        img {
                            transform: scale(1);
                        }
                    }
                }
            `}
    }
`
