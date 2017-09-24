// @flow
import React from 'react'
import Create from 'material-ui/svg-icons/content/create'
import Button from '../Button'

import { connect } from 'react-redux'

import { editMode } from '#/Editor.Core/actions/display'
import { isEditMode } from '#/Editor.Core/selector/display'
import { createStructuredSelector } from 'reselect'

const Inner = ({
  isEditMode,
  editMode
}: {
  isEditMode: boolean,
  editMode: Function
}) => (
  <Button
    icon={<Create />}
    description="编辑组件"
    active={isEditMode}
    onClick={editMode}
  />
)

const mapStateToProps = createStructuredSelector({ isEditMode })
const mapDispatchToProps = { editMode }

export default connect(mapStateToProps, mapDispatchToProps)(Inner)
