/// <reference types="@types/jest" />

import { converter } from './index'

describe('Showdown Extension • images', () => {
    it('should wrap images when they are more than one in a single <p>', () => {
        expect(converter.makeHtml(`![Image 1](img1.jpg)![Image 2](img2.jpg)`)).toContain(
            '<p class="showdown-images-extension"><img src="img1.jpg" alt="Image 1" /><img src="img2.jpg" alt="Image 2" /></p>'
        )

        expect(converter.makeHtml(`![Image 1](img1.jpg) ![Image 2](img2.jpg)`)).toContain(
            '<p class="showdown-images-extension"><img src="img1.jpg" alt="Image 1" /> <img src="img2.jpg" alt="Image 2" /></p>'
        )
    })

    it('should NOT wrap images if there is only one image inside a single <p>', () => {
        expect(converter.makeHtml(`![Image 1](img1.jpg)`)).toContain('<p><img src="img1.jpg" alt="Image 1" /></p>')
    })
})
