import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'
import { connect } from 'react-redux'
import { addAnchorNav, delAnchorNav } from '../actions'

let count = 0

const mapDispatchToProps = dispatch => {
    return {
        onAddAnchorNav: (navData) => {
            dispatch(addAnchorNav(navData))
        }
    }
}

class AnchorTitle extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        console.log('anchorTitle')        
        const {
            onAddAnchorNav,
            id,
        } = this.props
        this.props.dispatch(addAnchorNav({
            [id]: this.state.value
        }))
    }
    componentWillUnmount() {
        // console.log('unmount', this)
        // const { id } = this.props
        // this.props.dispatch(delAnchorNav(id))
    }
    state = {
        value: this.props.state.value || (() => {
            count++
            return `锚点标题${count}`
        })()
    }
    handleChange = e => {
        const content = e.target.textContent
        this.props.onChange({
            value: content
        })

        const {
            dispatch,
            id
        } = this.props
        this.props.dispatch(addAnchorNav({
            [id]: content
        }))
        /* this.props.onAddAnchorNav({
            [id]: content
        }) */
    }
    render() {
        const {
            state: { value },
            readOnly,
            id
        } = this.props

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div
                    className="anchor-title"
                    name={id}
                    contentEditable={!readOnly}
                    style={{ WebkitUserModify: readOnly ? 'read-only' : 'read-write-plaintext-only' }}
                    onBlur={this.handleChange}
                >
                    <span
                        style={{
                            display: 'inline-block',
                            height: '70%',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: 5,
                            margin: 'auto 0',
                            background: deepPurple400
                        }}
                    ></span>
                    <h2>{this.state.value}</h2>
                </div>
            </MuiThemeProvider >
        );
    }
}

AnchorTitle = connect()(AnchorTitle)

export default AnchorTitle;