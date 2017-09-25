import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: deepPurple400,
        accent1Color: orange500,
    }
})

const ThemeProvide = (props) => (
    <MuiThemeProvider muiTheme={muiTheme}>
        {props.children}
    </MuiThemeProvider>
)

export default ThemeProvide