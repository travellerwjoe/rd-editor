import Editor, { createEmptyState } from '#/Editor.Core'
import slate from '#/Editor.Plugin.Slate'
import image from '#/Editor.Plugin.Image'
import anchorTitle from '#/Editor.Plugin.AnchorTitle'


export const plugins = {
    content: [slate(), image, anchorTitle],
}

export default  new Editor({
    plugins,
    editables: [
        // ...content,
        createEmptyState()
    ]
})