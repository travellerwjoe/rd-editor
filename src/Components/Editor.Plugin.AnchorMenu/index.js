import React from 'react'
import Component from './Component'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Panorama from 'material-ui/svg-icons/image/panorama'


export default {
    Component,
    name: 'AnchorMenu',
    version: '0.0.1',
    IconComponent: <Menu />,
    text: '锚点菜单',
    isInlineable: true,
    description: '创建锚点菜单'
}