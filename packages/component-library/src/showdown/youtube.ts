import { ShowdownExtension } from 'showdown'

export const youtubeExtension = (): ShowdownExtension => {
    return {
        type: 'output',
        filter: (html) => {
            const longYoutubePattern =
                '(?:(?:https?:)?(?:\\/\\/)?)(?:(?:www)?\\.)?youtube\\.(?:.+?)\\/(?:(?:watch\\?v=)|(?:embed\\/))([a-zA-Z0-9_-]{11})'
            const shortYoutubePattern = '(?:(?:https?:)?(?:\\/\\/)?)?youtu\\.be\\/([a-zA-Z0-9_-]{11})'
            return [longYoutubePattern, shortYoutubePattern]
                .map((pattern) => new RegExp(`<a href="${pattern}.*?</a>`, 'gi'))
                .reduce((currentHtml, regexp) => {
                    return currentHtml.replace(regexp, (_match, url, _rest) => {
                        return `<div class="showdown-youtube-extension"><iframe src="https://www.youtube.com/embed/${url}" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe></div>`
                    })
                }, html)
        },
    }
}
