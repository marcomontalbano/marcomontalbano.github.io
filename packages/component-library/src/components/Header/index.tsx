import React, { useRef, useState } from 'react'
import styled from 'styled-components'

import useIntersectionObserver from '../../hooks/useIntersectionObserver'

import Background from './Background'
import BrandName from './BrandName'
import IntersectionRoot from './IntersectionRoot'
import Menu from './Menu'

const rndGradient = () => Math.floor(Math.random() * 256)

const initialGradientStart = rndGradient()
const initialGradientEnd = rndGradient()

const Container = styled.header`
    position: relative;
    height: 70px;
    color: white;

    a {
        color: white;
        text-decoration: none;
    }
`

const FixedContainer = styled.div`
    position: fixed;
    z-index: 1;
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

export type Props = {
    title: JSX.Element
    forceSolid?: boolean
    gradientStart?: number
    gradientEnd?: number
}

const Header = ({
    title = <a href="/">Website Title</a>,
    forceSolid = true,
    gradientStart = initialGradientStart,
    gradientEnd = initialGradientEnd,
}: Props) => {
    const [solid, setSolid] = useState(forceSolid)
    const intersectionObserverRef = useRef<HTMLElement>(null)

    useIntersectionObserver({
        ref: intersectionObserverRef,
        threshold: 1,
        callback: ([entry]) => {
            if (forceSolid === false) {
                setSolid(entry.intersectionRatio < 1)
            }
        },
    })

    const gradientProperties: any = {
        '--gradient-start': `hsl(${gradientStart}, 78%, 68%)`,
        '--gradient-end': `hsl(${gradientEnd}, 78%, 68%)`,
    }

    return (
        <Container>
            <FixedContainer style={gradientProperties}>
                <Background isSolid={solid} />
                <BrandName>{title}</BrandName>
                <Menu>
                    <a href="https://github.com/marcomontalbano">GitHub</a>
                </Menu>
            </FixedContainer>
            <IntersectionRoot ref={intersectionObserverRef} />
        </Container>
    )
}

export default Header
