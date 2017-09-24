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
        console.log('AnchorTitle', props)
    }
    componentWillMount() {
        const {
            onAddAnchorNav,
            id
        } = this.props
        this.props.dispatch(addAnchorNav({
            [id]: this.state.value
        }))
    }
    componentWillUnmount() {
        const { id, dispatch } = this.props
        dispatch(delAnchorNav(id))
    }
    state = {
        value: this.props.state.value,
        id: this.props.state.id
    }
    handleChange = e => {
        const content = e.target.textContent
        this.props.onChange({
            value: content,
            id: this.state.id
        })

        const { dispatch, id } = this.props
        dispatch(addAnchorNav({
            [id]: content
        }))
        /* this.props.onAddAnchorNav({
            [id]: content
        }) */
    }
    render() {
        const {
            state: { value },
            readOnly
        } = this.props

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={{ position: 'relative' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            height: '100%',
                            position: 'absolute',
                            left: -15,
                            top: 0,
                            bottom: 0,
                            width: 5,
                            margin: 'auto 0',
                            background: deepPurple400
                        }}
                    ></span>
                    <div
                        className="anchor-title"
                        name={this.state.id}
                        contentEditable={!readOnly}
                        style={{ WebkitUserModify: readOnly ? 'read-only' : 'read-write-plaintext-only' }}
                        onKeyUp={this.handleChange}
                    >
                        <h2>{this.state.value}</h2>
                    </div>
                </div>
            </MuiThemeProvider >
        );
    }
}

AnchorTitle = connect()(AnchorTitle)

export default AnchorTitle;