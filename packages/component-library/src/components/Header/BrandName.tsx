import styled from 'styled-components'

const BrandName = styled.div`
    flex-grow: 1;
    z-index: 1;
    font-family: 'Spinnaker', sans-serif;
    font-size: 1.2rem;
    padding-left: 15px;

    @media screen and (min-width: 834px) {
        padding-left: 25px;
        font-size: 1.5rem;
    }
`

export default BrandName
