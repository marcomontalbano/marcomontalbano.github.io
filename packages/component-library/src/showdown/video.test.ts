/// <reference types="@types/jest" />

import { converter } from './index'

describe('Showdown Extension • video', () => {
    it('should embed two or more video', () => {
        const html = converter.makeHtml(
            `[Video A Here](https://user-images.githubusercontent.com/1681269/199839122-efc19341-57f6-4408-8eca-524b4940458a.mp4) [Video B Here](https://user-images.githubusercontent.com/1681269/199839122-efc19341-57f6-4408-8eca-524b4940458ab.mp4)`
        )
        expect(html).toContain(
            '<video src="https://user-images.githubusercontent.com/1681269/199839122-efc19341-57f6-4408-8eca-524b4940458a.mp4'
        )
        expect(html).toContain(
            '<video src="https://user-images.githubusercontent.com/1681269/199839122-efc19341-57f6-4408-8eca-524b4940458ab.mp4'
        )
    })
})
