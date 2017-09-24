// @flow
import React from 'react'
import Devices from 'material-ui/svg-icons/device/devices'
import { connect } from 'react-redux'
import { previewMode } from '#/Editor.Core/actions/display'
import { isPreviewMode } from '#/Editor.Core/selector/display'
import { createStructuredSelector } from 'reselect'

import Button from '../Button'

const Inner = ({
  isPreviewMode,
  previewMode
}: {
  isPreviewMode: boolean,
  previewMode: Function
}) => (
  <Button
    icon={<Devices />}
    description="预览"
    active={isPreviewMode}
    onClick={previewMode}
  />
)

const mapStateToProps = createStructuredSelector({ isPreviewMode })
const mapDispatchToProps = { previewMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
