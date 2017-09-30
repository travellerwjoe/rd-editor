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
import AlertBar from '../AlertBar'
import { getNumberOfWordsFromState } from '../helper'
import './index.css'
import { MAX_NUMBER_OF_WORDS } from '@/config'

import ThemeProvider from '#/Editor.ThemeProvider'

import { createStore } from 'redux'
import reducer from './reducer'
import { changeTitle, changeAuthor, changeLocation, changeCover } from './actions'


const getToday = () => {
    const now = new Date()
    return now.getFullYear() + '-' + ((now.getMonth() + 1) >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) + '-' + (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate())
}


let initialState = {
    title: '',
    author: '',
    location: '',
    cover: '',
    date: getToday()
}

if (window.parent && window.parent.data) {
    const { Headline, Author, ProvinceName, CoverUrl, AddTime } = window.parent.data
    initialState = {
        title: Headline,
        author: Author,
        location: ProvinceName,
        cover: CoverUrl,
        date: AddTime
    }
}

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
        isPreviewMode: this.props.editor.store.getState().display.mode === 'preview',
        alertOpen: false,
        errorMsg: '',
        title: this.props.title,
        author: this.props.author,
        location: this.props.location,
        cover: this.props.cover,
        date: this.props.date,
    }
    constructor(props) {
        super(props)
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
        this.setState({
            title: e.target.value
        })
    }
    changeAuthor = (e) => {
        const { changeAuthor } = this.props
        changeAuthor(e.target.value)
        this.setState({
            author: e.target.value
        })
    }
    changeLocation = (e, index, value) => {
        const { changeLocation } = this.props
        changeLocation(value)
        this.setState({
            location: e.target.value
        })
    }
    changeCover = (e, value) => {
        const { changeCover } = this.props
        changeCover(value)
        this.setState({
            cover: e.target.value
        })
    }
    valildate(value, rules, messages) {
        const validator = {
            //必填
            required(value) {
                return value !== ''
            },
            //小于某数
            min(value, num) {
                return parseInt(value, 10) <= num
            },
            //大于某数
            max(value, num) {
                return parseInt(value, 10) >= num
            },
            //大小在某个范围内
            range(value, nums) {
                value = parseInt(value, 10)
                return value >= nums[0] && value <= nums[1]
            },
            //指定长度
            length(value, len) {
                return value.length === len
            },
            //最小长度
            minlength(value, len) {
                const reg = new RegExp(`^.{${len},}$`)
                return reg.test(value)
            },
            //最大长度
            maxlength(value, len) {
                const reg = new RegExp(`^.{0,${len}}$`)
                return reg.test(value)
            },
            //指定范围内的长度
            rangelength(value, lens) {
                const reg = new RegExp(`^.{${lens[0]},${lens[1]}}$`)
                return reg.test(value)
            },
            //手机号码
            phone(value) {
                return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
            },
            email(value) {
                return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.text(value)
            },
            url(value) {
                return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(value)
            },
            //邮编
            zipcode(value) {
                return /^[1-9]\d{5}(?!\d)$/.test(value)
            },
            //身份证
            IDcard(value) {
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)
            },
            //日期(YYYY-MM-DD)
            date(value) {
                return /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(value)
            },
            //英文
            english(value) {
                return /^[a-zA-Z]+$/i.test(value)
            },
            //数字
            number(value) {
                return /^\d+$/.test(value)
            },
            //英文数字
            word(value) {
                return /^[a-z0-9]+$/i.test(value)
            },
            //英文数字下划线
            word_(value) {
                return /^\w+$/.test(value)
            },
            //大写字母
            capital(value) {
                return /^[A-Z]+$/.test(value)
            },
            //小写字母
            lower(value) {
                return /^[a-z]+$/.test(value)
            },
            //中文
            chinese(value) {
                return /[\u4e00-\u9fa5]/gm.test(value)
            }
        }
        for (let key in rules) {
            const pass = key && validator[key] && validator[key](value, rules[key])
            if (!pass) {
                const msg = messages[key].replace('${0}', rules[key])
                return msg
            }
        }
    }
    alert(msg) {
        this.setState({
            errorMsg: msg,
            alertOpen: true
        })
        setTimeout(() => {
            this.setState({
                alertOpen: false
            })
        }, 4000)
    }
    onSave = (e) => {
        // const fileds = ['title', 'author', 'location', 'corver']
        const fields = {
            title: {
                required: true,
                maxlength: 30
            },
            author: {
                required: true,
                maxlength: 10
            },
            location: {
                required: true
            },
            cover: {
                required: true
            }
        }
        const messages = {
            title: {
                required: '请填写文章标题',
                maxlength: '文章标题最大为${0}字'
            },
            author: {
                required: '请填写作者',
                maxlength: '作者最大为${0}字'
            },
            location: {
                required: '请选择地区'
            },
            cover: {
                required: '请选择封面图片'
            }
        }

        for (let key in fields) {
            const errorMsg = this.valildate(this.state[key], fields[key], messages[key])
            if (errorMsg) {
                this.alert(errorMsg)
                return
            }
        }

        const editorState = this.props.editor.store.getState().editables.present
        const numberOfWords = getNumberOfWordsFromState(editorState)

        if (numberOfWords > MAX_NUMBER_OF_WORDS) {
            this.alert(`正文最大不要超过${MAX_NUMBER_OF_WORDS}字`)
            return
        }

        typeof this.props.onSave === 'function' && this.props.onSave(e)
        /* fileds.forEach(filed => {
            this.valildate(this.state[filed], )
        })
        this.valildate() */
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
                    onSave={this.onSave}
                />
                <AlertBar
                    open={this.state.alertOpen}
                    message={this.state.errorMsg}
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