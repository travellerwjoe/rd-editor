import React from 'react'
import Component from './Component'
import Title from 'material-ui/svg-icons/editor/title'

export default {
    Component,
    name: 'AnchorTitle',
    version: '0.0.1',
    IconComponent: <Title />,
    text: '锚点标题',
    isInlineable: true,
    description: '创建锚点菜单标题'
}