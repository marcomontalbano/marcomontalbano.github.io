import styled from 'styled-components'

const WelcomeHero = styled.div`
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: -100px;
    z-index: -1;
    width: 100%;
    height: 400px;
    background-image: url('/background.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(6px);

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(255, 255, 255);
        background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }
`

export default WelcomeHero
