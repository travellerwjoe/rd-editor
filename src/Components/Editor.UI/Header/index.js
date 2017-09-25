import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { UploaderDialogToggle } from '#/Editor.Plugin.Image/Component/Uploader'
import 'velocity-animate'
import VelocityComponent from 'velocity-react/velocity-component'
import { connect, Provider } from 'react-redux'
import './index.css'

import ThemeProvider from '#/Editor.ThemeProvider'

import { createStore } from 'redux'
import reducer from './reducer'
import { changeTitle, changeAuthor, changeLocation, changeCover } from './actions'

let initialState = {
    title: '',
    author: '',
    location: '',
    cover: ''
}

if (window.parent && window.parent.data) {
    const { Headline, Author, ProvinceName, CoverUrl } = window.parent.data
    initialState = {
        title: Headline,
        author: Author,
        location: ProvinceName,
        cover: CoverUrl
    }
}
console.log(initialState)

export let store = createStore(reducer, initialState)

const HeaderTextField = (props) => {
    return (
        <TextField
            floatingLabelText={props.title}
            floatingLabelFixed={true}
            floatingLabelStyle={{ color: '#fff' }}
            floatingLabelFocusStyle={{ color: '#fff' }}
            hintText={props.placeholder}
            hintStyle={{ color: 'rgba(255,255,255,0.7)' }}
            underlineFocusStyle={{ borderBottom: '2px solid #fff' }}
            inputStyle={{ color: '#fff' }}
            value={props.value}
            onChange={props.onChange}
        />
    )
}


const provinces = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区", "台湾"]

const items = provinces.map((provice, index) => <MenuItem key={index} value={provice} primaryText={provice} />)

class HeaderSelectField extends Component {
    state = {
        value: this.props.value || null
    }
    constructor(props) {
        super(props)
    }
    handleChange = (e, index, value) => {
        this.setState({ value })
        typeof this.props.onChange === 'function' && this.props.onChange(e, index, value)
    }
    render() {
        return (
            <SelectField
                floatingLabelText="地区"
                floatingLabelFixed={true}
                floatingLabelStyle={{ color: '#fff' }}
                hintText="请选择地区"
                hintStyle={{ color: 'rgba(255,255,255,0.7)' }}
                value={this.state.value}
                onChange={this.handleChange}
                labelStyle={{ color: '#fff' }}
                style={{ textAlign: 'left' }}
            >
                {this.props.children}
            </SelectField>
        )
    }
}

class SaveButton extends Component {
    constructor(props) {
        super(props)
    }
    onClick = (e) => {
        typeof this.props.onSave === 'function' && this.props.onSave(store.getState())
    }
    render() {
        return (
            <RaisedButton
                label='保存'
                secondary={true}
                style={{
                    lineHeight: '36px',
                    margin: '20px 15px 0 15px'
                }}
                labelStyle={{
                    verticalAlign: 'top'
                }}
                onClick={this.onClick}
            />
        )
    }
}






class Header extends Component {
    state = {
        isPreviewMode: this.props.editor.store.getState().display.mode === 'preview'
    }
    constructor(props) {
        super(props)
        console.log('Header', props)
        const store = props.editor.store
        store.subscribe(() => {
            this.setState({
                isPreviewMode: store.getState().display.mode === 'preview'
            })
        })
    }
    changeTitle = (e) => {
        const { changeTitle } = this.props
        changeTitle(e.target.value)
    }
    changeAuthor = (e) => {
        const { changeAuthor } = this.props
        changeAuthor(e.target.value)
    }
    changeLocation = (e, index, value) => {
        const { changeLocation } = this.props
        changeLocation(value)
    }
    changeCover = (e, value) => {
        const { changeCover } = this.props
        changeCover(value)
    }
    render() {
        const { title, author, location, cover } = this.props
        const headerElements = (
            <div className="header-elements">
                <HeaderTextField
                    title="文章标题"
                    placeholder="请输入文章标题"
                    value={title}
                    onChange={this.changeTitle}
                />
                <HeaderTextField
                    title="作者"
                    placeholder="请输入文章作者名字"
                    value={author}
                    onChange={this.changeAuthor}
                />
                <HeaderSelectField
                    value={location}
                    onChange={this.changeLocation}
                >
                    {items}
                </HeaderSelectField>
                <UploaderDialogToggle
                    type="Text"
                    textProps={{
                        floatingLabelText: '封面图片',
                        floatingLabelFixed: true,
                        floatingLabelStyle: { color: '#fff' },
                        hintText: "点击选择图片",
                        hintStyle: { color: 'rgba(255,255,255,0.7)' },
                        inputStyle: { color: '#fff' },
                        value: cover
                    }}
                    inline={true}
                    onConfirm={this.changeCover}
                />
                <SaveButton
                    onSave={this.props.onSave}
                />
            </div>
        )
        const animation = this.state.isPreviewMode ? { opacity: 0, translateY: '-75px' } : { opacity: 1, translateY: '0px' }
        return (
            <VelocityComponent animation={animation} duration={500}>
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
            </VelocityComponent>
        )
    }
}

/* const mapStateToProps = createStructuredSelector({
    isPreviewMode,

    // editables
}) */

const mapStateToProps = state => ({
    ...state
})


const mapDispatchToProps = dispatch => {
    return {
        changeTitle: title => {
            dispatch(changeTitle(title))
        },
        changeAuthor: author => {
            dispatch(changeAuthor(author))
        },
        changeLocation: location => {
            dispatch(changeLocation(location))
        },
        changeCover: cover => {
            dispatch(changeCover(cover))
        }
    }
}

const Decorate = connect(mapStateToProps, mapDispatchToProps)(Header)

Header = (props) => (
    <Provider store={store}>
        <ThemeProvider>
            <Decorate {...props} />
        </ThemeProvider>
    </Provider>
)

export default Header