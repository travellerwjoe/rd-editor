import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import './index.css'
// import App from './App'
import { RDEditor, RDControls, RDPageHeader } from './Components/Editor'
import registerServiceWorker from './registerServiceWorker'

if (/(MSIE|Trident|Edge)/g.test(navigator.userAgent)) {
    ReactDOM.render(
        <div className="not-support">
            暂不支持IE系列的浏览器，为了更好的编辑体验，建议使用最新版的<a href="https://www.baidu.com/s?wd=谷歌浏览器">Chrome 谷歌浏览器</a>或其它可使用极速模式的浏览器!
        </div >
        , document.getElementById('root'))
} else {

    let allState = {}
    let pageHeaderState = {
        author: "",
        cover: "",
        location: "",
        title: "",
        date: ''
    }
    let hasChange = true

    if (window.parent && window.parent.data) {
        const { Headline, Author, ProvinceName, CoverUrl, AddTime } = window.parent.data
        pageHeaderState = {
            title: Headline,
            author: Author,
            location: ProvinceName,
            cover: CoverUrl,
            date: AddTime.substr(0, 10)
        }
    }

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

    const handleEditorChange = (state) => {
        if (JSON.stringify(allState) !== JSON.stringify(state)) {
            hasChange = true
        }
        allState = state
    }


    const elements = document.querySelectorAll('.editable')
    for (const element of elements) {
        ReactDOM.render((
            <RDEditor
                id={element.dataset.id}
                onChange={handleEditorChange}
            />),
            element)
    }


    ReactDOM.render(<RDControls onSave={onSave} onSwitchPriview={onSwitchPriview} />, document.getElementById('controls'))

    ReactDOM.render(<RDPageHeader onChange={(state) => { pageHeaderState = state; hasChange = true }} />, document.getElementById('pageHeader'))

    // ReactDOM.render(<RDHTMLRenderer />, document.getElementById('editable-static'))

    registerServiceWorker()
}   