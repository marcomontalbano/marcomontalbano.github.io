import React, { useRef, useState } from 'react'

import useIntersectionObserver from '../../hooks/useIntersectionObserver'

import { Container, FixedContainer } from './Container'
import Background from './Background'
import BrandName from './BrandName'
import IntersectionRoot from './IntersectionRoot'
import Menu from './Menu'

const rndGradient = () => Math.floor(Math.random() * 256)

const initialGradientStart = rndGradient()
const initialGradientEnd = rndGradient()

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
        <Container forceSolid={forceSolid} style={gradientProperties}>
            <FixedContainer>
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
