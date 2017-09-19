// @flow
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Editor } from 'ory-editor-core/lib'
import dragDropContext from 'ory-editor-core/lib/components/DragDropContext'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple400,
    accent1Color: orange500,
  }
})

console.log(muiTheme)

type PropTypes = { editor: Editor, children: [] }

class Provider extends Component {
  constructor(props: PropTypes) {
    super(props)
    this.DragDropContext = dragDropContext(props.editor.dragDropContext)
  }

  props: PropTypes
  DragDropContext: any

  render() {
    const { editor, children = [] } = this.props
    const DragDropContext = this.DragDropContext
    return (
      <ReduxProvider store={editor.store}>
        <DragDropContext>
          <MuiThemeProvider muiTheme={muiTheme}>
            {children}
          </MuiThemeProvider>
        </DragDropContext>
      </ReduxProvider>
    )
  }
}

export default Provider
