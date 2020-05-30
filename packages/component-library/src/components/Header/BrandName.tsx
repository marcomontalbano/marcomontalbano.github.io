import styled from 'styled-components'

import { mediaQuery } from '../GlobalStyle'

const BrandName = styled.div`
    flex-grow: 1;
    z-index: 1;
    font-family: 'Spinnaker', sans-serif;
    font-size: 1.2rem;
    padding-left: 15px;

    @media ${mediaQuery.medium} {
        padding-left: 25px;
        font-size: 1.5rem;
    }
`

export default BrandName
