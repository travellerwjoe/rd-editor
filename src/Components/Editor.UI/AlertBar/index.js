import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'
import { red400 } from 'material-ui/styles/colors'

export default class AlertBar extends Component {
    render() {
        return (
            <div>
                <Snackbar
                    {...this.props}
                    autoHideDuration={4000}
                    bodyStyle={{
                        background: red400,

                    }}
                    style={{
                        bottom:'auto',
                        top:0,
                        transform: 'translate(-50%, 0px)'
                    }}
                />
            </div>
        )
    }
}
