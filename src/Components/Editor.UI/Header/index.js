import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './index.css'


const HeaderTextField = (props) => {
    const textStyle = {
        color: '#fff'
    }
    return (
        <TextField
            floatingLabelText={props.title}
            floatingLabelFixed={true}
            floatingLabelStyle={{ color: 'rgba(255,255,255,0.7)' }}
            floatingLabelFocusStyle={{ color: '#fff' }}
            hintText={props.placeholder}
            hintStyle={textStyle}
            underlineFocusStyle={{ borderBottom: '2px solid #fff' }}
            style={{ margin: '0 15px' }}
        />
    )
}

const headerElements = (
    <div className="header-elements">
        <HeaderTextField
            title="文章标题"
            placeholder="请输入文章标题"
        />
        <HeaderTextField
            title="作者"
            placeholder="请输入文章作者名字"
        />
        <SelectField
            floatingLabelText="地区"
            value="1"
        >
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
    </div>
)


class Header extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <AppBar
                    title={headerElements}
                    titleStyle={{
                        textAlign: 'center',
                        height: 75
                    }}
                    style={{
                        position: 'fixed',
                        top: 0
                    }}
                />
            </MuiThemeProvider>
        )
    }
}

export default Header