import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import UploaderDialog from './UploaderDialog'


class UploaderDialogToggle extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['Button', 'Text']),//展示行式，button控件或text控件
        buttonProps: PropTypes.object, //ReiseButton的props属性
        textProps: PropTypes.object, //TextField的props属性
        inline: PropTypes.bool,
        onConfirm: PropTypes.func
    }

    state = {
        open: false,
        value: this.props.textProps && this.props.textProps.value
    }
    handleOpen = (e) => {
        this.setState({
            open: true
        })
        e.target.blur()
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleConfirm = (e, value) => {
        if (this.props.type === 'Text') {
            this.setState({
                value
            })
        }
        typeof this.props.onConfirm === 'function' && this.props.onConfirm(e, value)
    }
    render() {
        const style = this.props.inline ? { display: 'inline-block' } : {}
        return (
            <div style={style}>
                {this.props.type === 'Button' ?
                    <RaisedButton
                        {...this.props.buttonProps}
                        onClick={this.handleOpen}
                    /> :
                    <TextField
                        {...this.props.textProps}
                        value={this.state.value}
                        onClick={this.handleOpen}
                    />
                }

                <UploaderDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

export default UploaderDialogToggle