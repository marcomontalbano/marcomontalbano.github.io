import { ShowdownExtension } from 'showdown'

export const imagesExtension = (): ShowdownExtension => {
    return {
        type: 'output',
        filter: (html) => {
            const imgPattern = '<img.*?src="(.*?)"[^\\>]+>\\s?'
            const regexp = new RegExp(`<p>(${imgPattern}){2,}</p>`, 'gi')
            return html.replace(regexp, (match) => {
                return match.replace('<p>', '<p class="showdown-images-extension">')
            })
        },
    }
}
