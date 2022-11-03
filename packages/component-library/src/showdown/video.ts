import { ShowdownExtension } from 'showdown'

export const videoExtension = (): ShowdownExtension => {
    return {
        type: 'output',
        filter: (html) => {
            return html.replace(
                new RegExp(
                    `<a href="(https:\/\/user-images\.githubusercontent\.com\/[0-9a-z\-\/]+\.mp4)">.*?<\/a>`,
                    'gi'
                ),
                '<video src="$1" controls width="100%"></video>'
            )
        },
    }
}
