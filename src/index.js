import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls, RDHTMLRenderer } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

let allState = {}

const save = () => {
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

ReactDOM.render((<div><RDControls /><button id="save" onClick={save}>保存</button></div>), document.getElementById('controls'))

// ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
