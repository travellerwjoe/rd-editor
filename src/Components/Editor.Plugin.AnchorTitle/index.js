import React from 'react'
import AnchorTitle, { Nav } from './Component'
import Title from 'material-ui/svg-icons/editor/title'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers)

/* const Component = (props) => {
    const children = props.nav ? <Nav {...props} /> : <AnchorTitle {...props} />
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
} */
const generateRandomID = (len) => Array.apply(null, Array(len)).map(item => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'[parseInt(Math.random() * 62)]).join('')


class Component extends React.Component {
    constructor(props) {
        super(props)
        console.log('component')
    }
    render() {
        const props = this.props
        const children = props.nav ? <Nav {...props} /> : <AnchorTitle {...props} />
        return (
            <Provider store={store}>
                {children}
            </Provider>
        )
    }
}

export const AnchorNav = (props) => <Component {...props} nav={true} />

export default {
    Component,
    name: 'AnchorTitle',
    version: '0.0.1',
    IconComponent: <Title />,
    text: '锚点标题',
    isInlineable: true,
    description: '创建锚点菜单标题',
    createInitialState: () => ({
        value: `锚点标题${document.querySelectorAll('.anchor-title').length + 1}`,
        id: `anchor-${generateRandomID(6)}`
    }),
    handleRemoveHotKey: (e, { content: { state: { value } } }) => {
        return new Promise(
            (resolve, reject) => {
                console.log(value)
                return value.length < 1 ? resolve() : reject()
            }
        )
    },
    handleBlur(props) {
        console.log('handleBlur', props)
    }
}