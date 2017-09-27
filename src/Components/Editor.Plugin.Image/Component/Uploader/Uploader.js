import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList'
import FontIcon from 'material-ui/FontIcon'
import { white } from 'material-ui/styles/colors'
import axios from 'axios'
import config from '@/config'

const { uploadUrl } = config

const getFiles = () => {
    return JSON.parse(localStorage.getItem('images')) || [
        {
            img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
            title: 'Breakfast',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
            title: 'Tasty burger',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
            title: 'Camera',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
            title: 'Morning',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
            title: 'Hats',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
            title: 'Honey',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
            title: 'Vegetables',
        },
        {
            img: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
            title: 'Water plant',
        }
    ] || []
}
localStorage.setItem('images', JSON.stringify(getFiles()))

class Uploader extends Component {
    static propTypes = {
        server: React.PropTypes.string, // 服务器上传地址
        multiple: React.PropTypes.bool, //多文件上传
        multipleSelect: React.PropTypes.bool, //文件可否多选
        onSelectFile: React.PropTypes.func, //选中已上传文件事件
        onDeleteFile: React.PropTypes.func, //删除已上传文件事件
        onUploadedFile: React.PropTypes.func.isRequired, //已上传文件回掉，需返回上传后的文件对象
    }

    static defaultProps = {
        multiple: true,
        multipleSelect: true
    }

    constructor(props) {
        super(props);

    }
    state = {
        files: getFiles(),
        //上传中的临时文件
        filesTmp: []
    }

    allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    limit = 2048000
    selectedFileCount = 0

    upload = (e) => {
        const el = e.target
        const files = el.files ? Array.prototype.slice.call(el.files) : []

        if (!files.length) {
            return
        }
        console.log(files)
        if (!this.checkFilesType(files)) {
            alert('只支持上传jpg、png、gif类型的图片')
            return
        }

        if (!this.checkFilesSize(files)) {
            alert(`最大只支持上传${parseInt(this.limit / 1000000)}M以内的图片`)
            return
        }

        const reader = new FileReader()
        const filesTmp = this.state.filesTmp.slice()
        const filesState = this.state.files.slice()

        files.forEach(file => {
            const request = () => {
                const params = new FormData()
                params.append('file', file, file.name)
                axios.post(uploadUrl, params, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        console.log(progressEvent)
                    }
                }).then(res => {
                    const uploadedImg = this.props.onUploadedFile(res)

                    if (!uploadedImg) {
                        alert('上传失败')
                        return
                    }
                    filesState.push(uploadedImg)
                    this.setState({
                        files: filesState
                    })
                    el.value = null
                }).catch(err => {
                    el.value = null
                    alert(err)
                })
            }


            //预览图片
            if (FileReader) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    filesTmp.push(e.target.result)
                    this.setState({
                        filesTmp
                    })
                    request()
                }
            } else {
                request()
            }
        })

    }

    checkFilesType(files) {
        return files.every(file => this.allowedFileTypes.includes(file.type))
    }

    checkFilesSize(files) {
        return files.every(file => file.size < this.limit)
    }

    selectFile = (e) => {
        const el = e.currentTarget
        const img = el.getElementsByTagName('img')[0]
        const src = img.src
        let status


        //单选文件
        if (!this.props.multipleSelect) {
            this.selectSingleFile(e, src)
        } else {
            //多选文件
            el.classList.toggle('uploader-selected')

            if (!el.classList.contains('uploader-selected')) {
                status = 'selected'
                this.selectedFileCount++
            } else {
                status = 'unselect'
                this.selectedFileCount--
            }
        }

        typeof this.props.onSelectFile === 'function' && this.props.onSelectFile(e, src, this.selectedFileCount, status)
    }

    selectSingleFile = (e, value) => {
        const isSelected = e.currentTarget.classList.contains('uploader-selected')
        document.querySelectorAll('.uploader-selected').forEach(el => {
            el.classList.remove('uploader-selected')
        })
        if (isSelected) {
            this.selectedFileCount = 0
            // e.target.classList.remove('uploader-selected')
        } else {
            e.currentTarget.classList.add('uploader-selected')
            this.selectedFileCount = 1
        }

    }

    deleteFile = (e, index) => {
        const files = this.state.files.slice()
        const deletedFile = files.splice(index, 1)
        this.setState({
            files
        })
        typeof this.onDeleteFile === 'function' && this.props.onDeleteFile(e, deletedFile)

    }

    hoverFile = (e) => {
        const el = e.currentTarget
        if (el.classList.contains('uploader-selected')) {
            return
        }
        el.classList.add('uploader-hover')
    }

    leaveFile = (e) => {
        const el = e.currentTarget
        el.classList.remove('uploader-hover')
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUpdate(nextProps, nextState) {
        const files = nextState.files
        localStorage.setItem('images', JSON.stringify(files))
    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const cols = 0.4
        return (
            <div className="uploader" style={{ marginTop: 10 }}>
                <GridList>
                    {
                        this.state.files.map((item, index) => {
                            return (

                                <GridTile
                                    key={index}
                                    title={item.title}
                                    cols={cols}
                                    actionIcon={
                                        <FontIcon
                                            className="material-icons"
                                            color={white}
                                            style={{ cursor: 'pointer', marginTop: 5 }}
                                            onClick={(e) => this.deleteFile(e, index)}
                                        >delete_forever
                                        </FontIcon>
                                    }
                                    onClick={this.selectFile}
                                    onMouseOver={this.hoverFile}
                                    onMouseOut={this.leaveFile}
                                >
                                    <img src={`${item.img}`} />
                                </GridTile>
                            )
                        })
                    }
                    {
                        this.state.filesTmp.map((item, index) => (
                            <GridTile
                                key={index}
                                //title={item.title}
                                cols={cols}
                            >
                                <img src={`${item}`} />
                            </GridTile>
                        ))
                    }
                    <GridTile
                        cols={cols}
                    >
                        <div className="uploader-append">
                            <svg viewBox="0 0 24 24" style={{ color: '#aaa', fill: 'currentcolor' }}>
                                <path d="M23 18V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zM8.5 12.5l2.5 3.01L14.5 11l4.5 6H5l3.5-4.5z"></path>
                            </svg>
                            <input type="file" className="uploader-file" id="uploaderFile" multiple={this.props.multiple} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, cursor: 'pointer' }} onChange={this.upload} />
                        </div>
                    </GridTile>
                </GridList>
            </div>
        );
    }
}

export default Uploader