import React from 'react'
import styled from 'styled-components'

type Props = {
    className?: string
    cover: string
    title: string
}

const Img = styled.img`
    min-height: 50vh;
    max-height: 80vh;

    display: block;
    width: 100%;
    object-fit: cover;
`

const Hero: React.FC<Props> = ({ cover, title, className }) => <Img className={className} src={cover} alt={title} />

export default Hero
