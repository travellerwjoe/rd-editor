import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Uploader from './Uploader'

import { deepPurple400, orange500 } from 'material-ui/styles/colors'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import uploadedCallback from './uploadedCallback'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepPurple400,
        accent1Color: orange500,
    }
})

class UploaderDialog extends Component {
    static propTypes = {
        open: React.PropTypes.bool.isRequired, //是否打开对话框
        onOpen: React.PropTypes.func, //对话框打开
        onClose: React.PropTypes.func, //对话框关闭
        onConfirm: React.PropTypes.func //对话框确认
    }

    state = {
        open: this.props.open,
        canConfirm: false
    }
    selected = null

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        nextProps.open && this.setState({
            open: nextProps.open
        })
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
        this.props.onOpen()
    }
    handleClose = () => {
        this.setState({
            open: false,
            canConfirm: false
        })
        typeof this.props.onClose === 'function' && this.props.onClose()
    }

    handleConfirm = (e) => {
        this.setState({
            open: false,
            canConfirm: false
        })
        typeof this.props.onClose === 'function' && this.props.onClose()
        typeof this.props.onConfirm === 'function' && this.props.onConfirm(e, this.selected)
    }

    handleSelectFile = (e, value, selectedCount, status) => {
        this.setState({
            canConfirm: !!selectedCount
        })
        this.selected = value
    }

    handleUploadedFile = (res) => {
        return uploadedCallback(res)
    }
    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                //keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="确认"
                primary={true}
                disabled={!this.state.canConfirm}
                //keyboardFocused={true}
                onClick={this.handleConfirm}
            />
        ]
        return (
            // <Provider {...this.props}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <Dialog
                    title="文件上传与选择"
                    actions={actions}
                    open={this.state.open}
                    //modal={true}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    contentStyle={{ width: '50%', maxWidth: 'none' }}
                >
                    <Uploader
                        multipleSelect={false}
                        onSelectFile={this.handleSelectFile}
                        onUploadedFile={this.handleUploadedFile}
                    />
                </Dialog>
            </MuiThemeProvider>
        );
    }
}


export default UploaderDialog