import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls, RDHTMLRenderer } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(<App />, document.getElementById('root'))
const elements = document.querySelectorAll('.editable')
for (const element of elements) {
    ReactDOM.render((
        <RDEditor
            id={element.dataset.id}
            onChange={(state) => {
                if (element.dataset.id === '1') {
                    // console.log(state)
                }
            }}
        />),
        element)
}

ReactDOM.render(<RDControls />, document.getElementById('controls'))

ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
