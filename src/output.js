import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import { RDHTMLRenderer } from '#/Editor'
import registerServiceWorker from './registerServiceWorker'

console.log('output')

ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

registerServiceWorker()
