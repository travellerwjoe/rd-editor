import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

let allState = {}

const onSave = () => {
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

ReactDOM.render(<RDControls onSave={onSave}/>, document.getElementById('controls'))

// ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
