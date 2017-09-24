// @flow
import React from 'react'
import classNames from 'classnames'
import PluginService from '#/Editor.Core/service/plugin'
import { editable as reducer } from '#/Editor.Core/reducer/editable'
import type { Cell, Row } from '#/Editor.Core/types/editable'

const gridClass = (size: number = 12): string =>
    `ory-cell-sm-${size} ory-cell-xs-12`

const HTMLRow = ({ cells = [], className, hasInlineChildren, children }: Row) => (
    <div
        className={classNames('ory-row', className, {
            'ory-row-has-floating-children': hasInlineChildren
        })}
    >
        {cells.map((c: Cell) => <HTMLCell key={c.id} {...c} />)}
        {children}
    </div>
)

// eslint-disable-next-line no-empty-function
const noop = () => { }

const HTMLCell = (props: Cell) => {
    const {
    rows = [],
        layout = {},
        content = {},
        hasInlineNeighbour,
        inline,
        size
  } = props
    const cn = classNames('ory-cell', gridClass(size), {
        'ory-cell-has-inline-neighbour': hasInlineNeighbour,
        [`ory-cell-inline-${inline || ''}`]: inline
    })

    if (layout.plugin) {
        const { state, plugin: { Component } } = layout

        return (
            <div className={cn}>
                <div className="ory-cell-inner">
                    <Component isPreviewMode readOnly state={state} onChange={noop}>
                        {rows.map((r: Row) => (
                            <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
                        ))}
                    </Component>
                </div>
            </div>
        )
    } else if (content.plugin) {
        const { state, plugin: { Component, StaticComponent } } = content
        const Renderer = StaticComponent || Component

        return (
            <div className={cn}>
                <div className="ory-cell-inner ory-cell-leaf">
                    <Renderer isPreviewMode readOnly state={state} onChange={noop} />
                </div>
            </div>
        )
    } else if (rows.length > 0) {
        return (
            <div className={cn}>
                {rows.map((r: Row) => (
                    <HTMLRow key={r.id} {...r} className="ory-cell-inner" />
                ))}
            </div>
        )
    }

    return (
        <div className={cn}>
            <div className="ory-cell-inner" />
        </div>
    )
}

export const HTMLRenderer = ({
  state,
    plugins,
    tools
}: {
        state: any,
        plugins: { layout: [], content: [] }
    }) => {
    const service = new PluginService(plugins)
    const props = reducer(service.unserialize(state), { type: 'renderer/noop' })
    console.log(props)
    console.log(tools.AnchorNav)
    return (<HTMLRow {...props}>
        <tools.AnchorNav {...props} />
    </HTMLRow>)
}
