import styled from 'styled-components'

import { mediaQuery } from '../GlobalStyle'

type ContainerProps = {
    forceSolid: boolean
}

export const Container = styled.header`
    position: relative;
    color: white;

    height: 60px;

    ~ * {
        margin-top: ${(props: ContainerProps) => (props.forceSolid ? 0 : '-60px')};
    }

    @media ${mediaQuery.medium} {
        height: 70px;

        ~ * {
            margin-top: ${(props: ContainerProps) => (props.forceSolid ? 0 : '-70px')};
        }
    }

    a {
        color: white;
        text-decoration: none;
    }
`

export const FixedContainer = styled.div`
    position: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    width: 100%;
    height: inherit;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, black -60%, transparent 105%);
    }
`
