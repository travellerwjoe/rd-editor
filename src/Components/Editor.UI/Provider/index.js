// @flow
import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Editor } from '#/Editor.Core'
import dragDropContext from '#/Editor.Core/components/DragDropContext'
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
    const { editor, children = [], store } = this.props
    const DragDropContext = this.DragDropContext
    const newStore = { ...store, ...editor.store }
    console.log('Provider',newStore)
    console.log(newStore.getState())
    return (
      <ReduxProvider store={newStore}>
        <DragDropContext>
          <MuiThemeProvider muiTheme={muiTheme}>
            {children}
          </MuiThemeProvider>
        </DragDropContext>
      </ReduxProvider >
    )
  }
}

export default Provider
