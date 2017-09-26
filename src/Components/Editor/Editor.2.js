import React from 'react'
import { AnchorNav } from '../Editor.Plugin.AnchorTitle'
import { Trash, DisplayModeToggle, Toolbar, Header, PreviewTabs, PageHeader } from '../Editor.UI'
import { HTMLRenderer } from '../Editor.Renderer'
import {Editable} from '../Editor.Core'

const tools = {
    AnchorNav
}

export const RDEditor = (props) => {
    const { editor } = props
    return (
        <Editable
            editor={editor}
            id={props.id}
            onChange={props.onChange}
        />
    )
}

export const RDControls = (props) => {
    const { editor } = props
    return (
        <div>
            <Trash editor={editor} />
            <DisplayModeToggle editor={editor} />
            <Toolbar editor={editor} />
            <Header editor={editor} onSave={props.onSave} />
            <AnchorNav editor={editor} />
            <PreviewTabs editor={editor} />
        </div>
    )
}


export const RDHTMLRenderer = (props) => {
    const { content, plugins } = props
    return (
        <HTMLRenderer state={content[0]} plugins={plugins} tools={tools} />
    )
}

export const RDPageHeader = (props) => {
    const { editor } = props
    return (
        < PageHeader editor={editor} />
    )
}

export default Editable 