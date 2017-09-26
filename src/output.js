import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import { RDHTMLRenderer, RDPageHeader } from '#/Editor'
import registerServiceWorker from './registerServiceWorker'

import editor,{ plugins } from '#/Editor/instance'
import defaultContent from '#/Editor/content'

let content = defaultContent

ReactDOM.render(<RDHTMLRenderer content={content} plugins={plugins} />, document.getElementById('editable-static'))

ReactDOM.render(<RDPageHeader editor={editor} />, document.getElementById('pageHeader'))

registerServiceWorker()
