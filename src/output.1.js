import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import { RDHTMLRenderer, RDPageHeader} from '#/Editor'
import registerServiceWorker from './registerServiceWorker'

console.log('output')

ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

ReactDOM.render(<RDPageHeader />, document.getElementById('pageHeader'))

registerServiceWorker()
