import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import { deepPurple400, orange500 } from 'material-ui/styles/colors'
import { connect } from 'react-redux'
import { addAnchorNav, delAnchorNav } from '../actions'
import { MAX_NUMBER_OF_WORDS } from '../config'

/* const mapDispatchToProps = dispatch => {
    return {
        onAddAnchorNav: (navData) => {
            dispatch(addAnchorNav(navData))
        }
    }
} */


class AnchorTitle extends Component {
    componentWillMount() {
        const {
            // onAddAnchorNav,
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
        id: this.props.state.id,
    }
    handleChange = e => {
        const content = e.target.textContent
        if (e.keyCode !== 8 && content.length >= MAX_NUMBER_OF_WORDS) {
            e.target.innerHTML = content.substr(0, 50)
            e.target.blur()
            return false
        }
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
    handleKeyDown = (e) => {
        const content = e.target.textContent
        if (e.keyCode !== 8 && content.length >= MAX_NUMBER_OF_WORDS) {
            e.target.innerHTML = content.substr(0, 50)
            e.target.blur()
            return false
        }
    }
    render() {
        const {
            state: { value },
            readOnly
        } = this.props

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div className="anchor-title-container">
                    <span className="anchor-title-line"></span>
                    <div
                        className="anchor-title"
                        name={this.state.id}
                        contentEditable={!readOnly}
                        style={{ WebkitUserModify: readOnly ? 'read-only' : 'read-write-plaintext-only' }}
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleChange}
                    >
                        {value}
                    </div>
                </div>
            </MuiThemeProvider >
        );
    }
}

AnchorTitle = connect()(AnchorTitle)

export default AnchorTitle;