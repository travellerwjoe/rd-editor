import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import Editable, { RDEditor, RDControls, RDPageHeader } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

import { getData } from './business'

import editor from '#/Editor/instance'


import defaultContent from '#/Editor/content'
import './styles/index.css'
require('react-tap-event-plugin')()


let content = defaultContent


const initilize = () => {
    let allState = {}

    const onSave = (state) => {
        const data = {
            ...state,
            content: JSON.stringify(allState)
        }
        window.parent && typeof window.parent.onSave === 'function' && window.parent.onSave(data)
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

    console.log('init',editor)
    ReactDOM.render(<RDControls editor={editor} onSave={onSave} />, document.getElementById('controls'))

    ReactDOM.render(<RDPageHeader editor={editor} />, document.getElementById('pageHeader'))

    // ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

    registerServiceWorker()
}

getData()
    .then(data => {
        if (data && data.Content) {
            content = data.content
        }

        console.log('getdata')

        initilize()
    })
    .catch(()=>{
        console.log('getdata catch')
        initilize()
    })


