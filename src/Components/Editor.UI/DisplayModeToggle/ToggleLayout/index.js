// @flow
import React from 'react'
import ViewQuilt from 'material-ui/svg-icons/action/view-quilt'
import Button from '../Button'

import { connect } from 'react-redux'

import { layoutMode } from '#/Editor.Core/actions/display'
import { isLayoutMode } from '#/Editor.Core/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({
  isLayoutMode,
  layoutMode
}: {
  isLayoutMode: boolean,
  layoutMode: Function
}) => (
  <Button
    icon={<ViewQuilt />}
    description="移动组件"
    active={isLayoutMode}
    onClick={layoutMode}
  />
)

const mapStateToProps = createStructuredSelector({ isLayoutMode })
const mapDispatchToProps = { layoutMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
