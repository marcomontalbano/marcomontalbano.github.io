import showdown from 'showdown'
import { youtubeExtension } from './youtube'
import { imagesExtension } from './images'
import { videoExtension } from './video'
import { emoji } from './emoji'

// @ts-expect-error - This type is wrong, check here: https://git.io/Jks2A
showdown.helper.emojis = {
    ...emoji,
    ...showdown.helper.emojis,
}

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
converter.addExtension(videoExtension)

export { showdown, converter }
