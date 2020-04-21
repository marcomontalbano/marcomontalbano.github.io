import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import showdown from 'showdown'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { StyledComponents } from '../types'

export type Props = {
    markdown: string
}

const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    emoji: true,
    tables: true,
})

const convertMarkdownToHtml = (markdown: string = ''): string => converter.makeHtml(markdown)

const Markdown = ({ className, markdown }: Props & StyledComponents) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const [html, setHtml] = useState(() => (typeof window !== 'undefined' ? '' : convertMarkdownToHtml(markdown)))

    useEffect(() => {
        setHtml(convertMarkdownToHtml(markdown))
    }, [markdown])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.querySelectorAll('code[class*=language-]').forEach((block) => {
                hljs.highlightBlock(block)
            })
        }
    }, [html, containerRef])

    return (
        <div
            ref={containerRef}
            className={className}
            dangerouslySetInnerHTML={{
                __html: html,
            }}
        ></div>
    )
}

export default styled(Markdown)``
