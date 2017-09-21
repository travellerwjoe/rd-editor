import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'
import AnchorNav from './AnchorNav'
import { connect } from 'react-redux'
import { addAnchorNav } from '../actions'


class AnchorTitle extends Component {
    constructor(props) {
        super(props)
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
        dispatch(addAnchorNav({
            id,
            title: content
        }))
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
                    <h2>{this.props.state.value || '锚点标题'}</h2>
                </div>
            </MuiThemeProvider >
        );
    }
}

AnchorTitle = connect()(AnchorTitle)

export default AnchorTitle;