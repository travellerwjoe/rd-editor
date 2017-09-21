import React from 'react'

import Editor, { Editable, createEmptyState } from '../Editor.Core'
// import 'ory-editor-core/lib/index.css'

import { Trash, DisplayModeToggle, Toolbar, Header } from '../Editor.UI'
import slate from '../Editor.Plugin.Slate'

import image from '../Editor.Plugin.Image'

import anchorTitle from '../Editor.Plugin.AnchorTitle'

import video from 'ory-editor-plugins-video'
import 'ory-editor-plugins-video/lib/index.css'

import html5video from 'ory-editor-plugins-html5-video'
import 'ory-editor-plugins-html5-video/lib/index.css'

import spacer from 'ory-editor-plugins-spacer'
import 'ory-editor-plugins-spacer/lib/index.css'

import parallax from 'ory-editor-plugins-parallax-background'
import 'ory-editor-plugins-parallax-background/lib/index.css'

import native from 'ory-editor-plugins-default-native'

import { HTMLRenderer } from 'ory-editor-renderer'

import content from './content'
import '../../styles/index.css'

require('react-tap-event-plugin')()



const plugins = {
    content: [slate(), image, anchorTitle],
    // layout: [parallax({ defaultPlugin: slate() })],
    native
}

const editor = new Editor({
    plugins,
    editables: [
        ...content,
        createEmptyState()
    ]
})

export const RDEditor = (props) => {
    console.log(props)
    return (
        <Editable
            editor={editor}
            id={props.id}
            onChange={props.onChange}
        />
    )
}

export const RDControls = () => {
    return (
        <div>
            <Trash editor={editor} />
            <DisplayModeToggle editor={editor} />
            <Toolbar editor={editor} />
            <Header editor={editor} />
        </div>
    )
}

export const RDHTMLRenderer = () => {
    return (
        <HTMLRenderer state={content[0]} plugins={plugins} />
    )
}

export default Editable