import styled, { css, keyframes } from 'styled-components'

const animation = keyframes`
    0% { background-size: 600% }
    100% { background-size: 100% }
`

const BackgroundGradient = css`
    box-shadow: 1px 1px 10px -4px black;
    background: rgb(19, 96, 138);
    background: linear-gradient(96deg, var(--gradient-start), var(--gradient-end));

    background-size: 200%;
    background-position: 50% 0;

    &.animate {
        animation: ${animation} 5s ease infinite;
        animation: ${animation} 5s linear forwards;
    }
`

type BackgroundProps = {
    isSolid: boolean
}

const Background = styled.div`
    ${BackgroundGradient}
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
    opacity: ${(props: BackgroundProps) => (props.isSolid ? 1 : 0)};
    &.solid {
        opacity: 1;
    }
`

export default Background
