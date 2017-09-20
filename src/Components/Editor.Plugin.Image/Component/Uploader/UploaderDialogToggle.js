import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton'
import UploaderDialog from './UploaderDialog'


class UploaderDialogToggle extends Component {
    state = {
        open: false
    }
    constructor(props) {
        super(props)
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleConfirm = (e, value) => {
        typeof this.props.onConfirm === 'function' && this.props.onConfirm(e, value)
    }
    render() {
        return (
            <div>
                <RaisedButton
                    label="选择图片"
                    onClick={this.handleOpen}
                />
                <UploaderDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

UploaderDialogToggle.propTypes = {
    label: React.PropTypes.string,
    onConfirm: React.PropTypes.func
};

export default UploaderDialogToggle;