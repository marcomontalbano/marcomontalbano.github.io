import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { converter } from '../showdown'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { StyledComponents } from '../types'

export type Props = {
    markdown: string
}

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

export default styled(Markdown)`
    .showdown-youtube-extension {
        height: 0;
        overflow: hidden;
        padding-bottom: ${((9 / 16) * 100).toFixed(2)}%;
        position: relative;
        max-width: 90%;
        border-radius: 5px;
        margin: 0 auto;

        iframe,
        object,
        embed {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
`
