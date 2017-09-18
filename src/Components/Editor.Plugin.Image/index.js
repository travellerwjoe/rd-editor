// @flow
/* eslint-disable no-duplicate-imports */
import React from 'react'
import Component from './Component'
import Panorama from 'material-ui/svg-icons/image/panorama'
import type { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'
import './index.css'

export default {
  Component,
  name: 'ory/editor/core/content/image',
  version: '0.0.1',
  IconComponent: <Panorama />,
  text: '图片',
  isInlineable: true,
  description: '网络图片url或本地上传',

  handleRemoveHotKey: (_: Event, __: ContentPluginProps<*>): Promise<*> =>
    Promise.reject(),
  handleFocusPreviousHotKey: (
    _: Event,
    __: ContentPluginProps<*>
  ): Promise<*> => Promise.reject(),
  handleFocusNextHotKey: (_: Event, __: ContentPluginProps<*>): Promise<*> =>
    Promise.reject(),

  // We need this because otherwise we lose hotkey focus on elements like spoilers.
  // This could probably be solved in an easier way by listening to window.document?

  handleFocus: (props: any, source: any, ref: HTMLElement) => {
    if (!ref) {
      return
    }
    setTimeout(() => ref.focus())
  }
}
