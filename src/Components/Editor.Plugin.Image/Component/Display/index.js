// @flow
import React from 'react'
import ImageIcon from 'material-ui/svg-icons/image/panorama'

import { iconStyle } from '../common.js'
// import type { PropTypes } from '../index.js'

/* const Display = ({ state }: PropTypes) =>
  state.src ? (
    <div>
      <img className="ory-plugins-content-image" src={state.src} />
    </div>
  ) : (
    <div>
      <div className="ory-plugins-content-image-placeholder">
        <ImageIcon style={iconStyle} />
      </div>
    </div>
  ) */

class Display extends React.Component {
  render() {
    const { state } = this.props
    return state.src ? (
      <div>
        <img className="ory-plugins-content-image" src={state.src} alt="加载失败"/>
      </div>
    ) : (
        <div>
          <div className="ory-plugins-content-image-placeholder">
            <ImageIcon style={iconStyle} />
          </div>
        </div>
      )
  }
}

export default Display
