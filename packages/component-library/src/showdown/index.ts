import showdown from 'showdown'
import { youtubeExtension } from './youtube'
import { imagesExtension } from './images'

const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    emoji: true,
    tables: true,
    tasklists: true,
    ghCompatibleHeaderId: true,
})

converter.addExtension(youtubeExtension)
converter.addExtension(imagesExtension)

export { showdown, converter }
