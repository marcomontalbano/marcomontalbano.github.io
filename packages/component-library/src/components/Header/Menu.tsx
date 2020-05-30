import styled from 'styled-components'

import { mediaQuery } from '../GlobalStyle'

export default styled.div`
    z-index: 1;
    > a {
        padding: 0 15px;

        @media ${mediaQuery.medium} {
            padding: 0 25px;
        }
    }
`
