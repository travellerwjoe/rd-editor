// @flow
import React from 'react'
import Display from '../Display'
import TextField from 'material-ui/TextField'
import { UploaderDialogToggle } from '../Uploader'
import type { PropTypes } from '../index.js'

import { BottomToolbar } from '#/Editor.UI'

import { triggerEvent } from '@/helpers/event'


class Form extends React.Component {
  state = {
    value: this.props.state.src
  }
  constructor(props: PropTypes) {
    super(props)
  }
  handleChange = (onChange: Function) => (e: Event) => {
    const target = e.target

    this.setState({
      value: target.value
    })

    if (target instanceof HTMLInputElement) {
      onChange({ src: target.value })
      return
    }
  }
  handleConfirm = (e, value) => {
    this.setState({
      value
    })

    this.props.onChange({ src: value })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, this.state)
  }

  render() {
    return (
      <div>
        <Display {...this.props} />
        <BottomToolbar open={this.props.focused}>
          <TextField
            hintText="http://example.com/image.png"
            floatingLabelText="图片路径（url地址）"
            inputStyle={{ color: 'white' }}
            floatingLabelStyle={{ color: 'white' }}
            hintStyle={{ color: 'grey' }}
            style={{ width: '512px' }}
            value={this.state.value}
            onChange={this.handleChange(this.props.onChange)}
          />
          <UploaderDialogToggle
            type="Button"
            buttonProps={{
              label: '选择图片'
            }}
            onConfirm={this.handleConfirm}
          />
        </BottomToolbar>
      </div>
    )
  }
}
export default Form
