import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls, RDPageHeader } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

let allState = {}
let pageHeaderState = {
    author: "",
    cover: "",
    location: "",
    title: ""
}
let hasChange = true

const onSave = (state) => {
    const data = {
        ...state,
        content: JSON.stringify(allState)
    }
    if (window.parent) {
        typeof window.parent.onSave === 'function' && window.parent.onSave(data)
    }
    window.close()
    console.log(JSON.stringify(allState, null, 4))
}

const preview = document.getElementById('preview')

const onSwitchPriview = (mode) => { 
    if (!hasChange) {
        return
    }
    if (mode === 'iPhone' || mode === 'iPad') {
        preview.src = './renderer.html'
        preview.onload = function () {
            preview.contentWindow.data = {
                header: pageHeaderState,
                content: allState
            }
            typeof preview.contentWindow.RDEditorRenderer === 'function' && new preview.contentWindow.RDEditorRenderer(preview.contentWindow.data)
        }
        hasChange = false
    }
}

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
    ReactDOM.render((
        <RDEditor
            id={element.dataset.id}
            onChange={(state) => {
                if (JSON.stringify(allState) !== JSON.stringify(state)) {
                    hasChange = true
                }
                allState = state
            }}
        />),
        element)
}

ReactDOM.render(<RDControls onSave={onSave} onSwitchPriview={onSwitchPriview} />, document.getElementById('controls'))

ReactDOM.render(<RDPageHeader onChange={(state) => { pageHeaderState = state; hasChange = true }} />, document.getElementById('pageHeader'))

// ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
