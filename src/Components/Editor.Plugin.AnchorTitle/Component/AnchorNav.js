import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'
import 'velocity-animate'

const mapStateToProps = state => {
    return {
        navData: state.anchorNav
    }
}


const getAnchorTitleState = () => {
    const allAnchorTitleState = []
    return function each(state) {
        state.forEach(item => {
            const {
            id,
                cells,
                rows,
                content
            } = item
            if (cells && cells.length) {
                each(item.cells)
            }
            if (rows && rows.length) {
                each(item.rows)
            }
            if (content && content.plugin.name === 'AnchorTitle') {
                allAnchorTitleState.push({
                    ...content.state
                })
            }
        })
        return allAnchorTitleState
    }
}

//节流
const throttle = (func, wait, mustRun) => {
    var timeout,
        startTime = new Date()

    return function () {
        var context = this,
            args = arguments,
            curTime = new Date()

        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
            func.apply(context, args)
            startTime = curTime
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(func, wait)
        }
    }
}

//防抖
const debounce = (func, wait, immediate) => {
    var timeout
    return function () {
        var context = this, args = arguments
        var later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

class AnchorNav extends Component {
    allAnchorTitleState
    constructor(props) {
        super(props)
        console.log('AnchorNav', props)
        const editorState = props.editor ? props.editor.store.getState().editables.present : props.cells
        console.time('each')
        this.allAnchorTitleState = getAnchorTitleState()(editorState)
        console.timeEnd('each')
        console.log(this.allAnchorTitleState)

        const scroll = () => {
            const scrollTop = window.scrollY,
                titleEl = document.querySelectorAll('.anchor-title')

            for (let i = titleEl.length - 1; i >= 0; i--) {
                const item = titleEl[i]

                const rect = item.getBoundingClientRect(),
                    top = (document.documentElement.scrollTop || document.body.scrollTop) + rect.top - 100,
                    name = item.getAttribute('name'),
                    nav = document.querySelector('.anchor-nav')

                if (scrollTop >= top) {
                    const target = nav.querySelector(`li[name="${name}"]`)
                    nav.querySelectorAll('li').forEach(obj => obj.style = null)
                    target.style.background = deepPurple400
                    target.style.color = '#fff'
                    break
                }
            }
        }
        window.addEventListener('scroll', scroll)
    }
    navigate = (e, id) => {
        const target = document.querySelector(`.anchor-title[name='${id}']`)
        const top = (document.documentElement.scrollTop || document.body.scrollTop) + target.getBoundingClientRect().top - 100

        console.log(top)
        window.Velocity(document.querySelector('html'), 'scroll', { duration: 1000, offset: top + 'px', mobileHA: false })
    }
    componentDidMount() {
        console.log(this.refs.nav.runAnimation)
    }
    componentWillUpdate(nextProps, nextState) {
        const editorState = nextProps.editor.store.getState()
        console.time('each')
        this.allAnchorTitleState = getAnchorTitleState()(editorState.editables.present)
        console.timeEnd('each')
        console.log(this.allAnchorTitleState)
    }
    render() {
        const lis = this.allAnchorTitleState.map(item => (
            <li
                key={item.id}
                onClick={(e) => this.navigate(e, item.id)}
                name={item.id}
                style={item.current ? {
                    background: deepPurple400,
                    color: '#fff'
                } : {}}
            >
                {item.value}
            </li>
        ))

        return (

            <div className="anchor-nav" ref="nav">
                <ul className="anchor-nav-list">
                    {lis}
                </ul>
            </div>
        )
    }
}

AnchorNav = connect(mapStateToProps)(AnchorNav)

export default AnchorNav