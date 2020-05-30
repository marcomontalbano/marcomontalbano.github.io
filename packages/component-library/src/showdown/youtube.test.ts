/// <reference types="@types/jest" />

import { converter } from './index'

describe('Showdown Extension • youtube', () => {
    it('should embed the youtube video using the long url', () => {
        const html = converter.makeHtml('[Video Here](https://www.youtube.com/watch?v=oRdzL2DX0yU&feature=emb_title)')
        expect(html).toContain('<iframe src="https://www.youtube.com/embed/oRdzL2DX0yU')
    })

    it('should embed two or more youtube video', () => {
        const html = converter.makeHtml(
            `[Video A Here](https://www.youtube.com/watch?v=oRdzL2DX0yU&feature=emb_title) [Video B Here](https://www.youtube.com/watch?v=12345567890)`
        )
        expect(html).toContain('<iframe src="https://www.youtube.com/embed/oRdzL2DX0yU')
        expect(html).toContain('<iframe src="https://www.youtube.com/embed/12345567890')
    })

    it('should embed the youtube video using the shorter url', () => {
        const html = converter.makeHtml('[Video Here](https://youtu.be/oRdzL2DX0yU?feature=emb_title)')
        expect(html).toContain('<iframe src="https://www.youtube.com/embed/oRdzL2DX0yU')
    })
})
