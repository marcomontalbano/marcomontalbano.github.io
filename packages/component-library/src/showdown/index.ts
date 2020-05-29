import showdown from 'showdown'
import { youtubeExtension } from './youtube'

const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    emoji: true,
    tables: true,
    tasklists: true,
})

converter.addExtension(youtubeExtension)

export { showdown, converter }
