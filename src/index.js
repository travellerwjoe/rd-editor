import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls, RDPageHeader } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

let allState = {}

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

const elements = document.querySelectorAll('.editable')
for (const element of elements) {
    ReactDOM.render((
        <RDEditor
            id={element.dataset.id}
            onChange={(state) => {
                allState = state
            }}
        />),
        element)
}

ReactDOM.render(<RDControls onSave={onSave} />, document.getElementById('controls'))

ReactDOM.render(<RDPageHeader />, document.getElementById('pageHeader'))

// ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
