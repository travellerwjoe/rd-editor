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
    containerMargin = document.querySelector('.container').offsetTop
    pageHeaderHeight
    constructor(props) {
        super(props)
        const editorState = props.editor ? props.editor.store.getState().editables.present : props.cells
        this.allAnchorTitleState = getAnchorTitleState()(editorState)


        const scroll = () => {
            const scrollTop = window.scrollY,
                titleEl = document.querySelectorAll('.anchor-title')

            if (!this.pageHeaderHeight) {
                this.pageHeaderHeight = document.getElementById('pageHeader').getBoundingClientRect().height
            }

            for (let i = titleEl.length - 1; i >= 0; i--) {
                const item = titleEl[i]

                const rect = item.getBoundingClientRect(),
                    top = (document.documentElement.scrollTop || document.body.scrollTop) + rect.top - 100 + this.containerMargin - this.pageHeaderHeight,
                    name = item.getAttribute('name'),
                    nav = document.querySelector('.anchor-nav')

                if (scrollTop >= top) {
                    const target = nav.querySelector(`li[name="${name}"]`)
                    const navLis = nav.querySelectorAll('li')
                    for (let i = 0; i < navLis.length; i++) {
                        const navLi = navLis[i]
                        navLi.style = null
                    }
                    target.style.background = deepPurple400
                    target.style.color = '#fff'
                    break
                }
            }
        }
        window.addEventListener('scroll', scroll)

        //有锚点菜单并且在平板或手机上浏览
        if (this.allAnchorTitleState.length && document.body.offsetWidth < 800) {
            document.querySelector('.container').style.marginTop = '60px'
        }
    }
    navigate = (e, id) => {
        const target = document.querySelector(`.anchor-title[name='${id}']`)
        // const pageHeaderHeight = document.getElementById('pageHeader').getBoundingClientRect().height
        const top = (document.documentElement.scrollTop || document.body.scrollTop) + target.getBoundingClientRect().top - 100 + this.containerMargin

        window.Velocity(document.querySelector('html'), 'scroll', { duration: 1000, offset: top + 'px', mobileHA: false })
    }
    componentDidMount() {

    }
    componentWillUpdate(nextProps, nextState) {
        const editorState = nextProps.editor.store.getState()
        this.allAnchorTitleState = getAnchorTitleState()(editorState.editables.present)
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