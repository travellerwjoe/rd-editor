import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import reducer from '../Header/reducer'
import { store } from '../Header'
import { createStore, combineReducers } from 'redux'

// let store = createStore(reducer)

const getToday = () => {
    const now = new Date()
    return now.getFullYear() + '-' + ((now.getMonth() + 1) >= 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1)) + '-' + (now.getDate() >= 10 ? now.getDate() : '0' + now.getDate())
}

class PageHeader extends Component {
    state = {
        ...(store.getState())
    }
    constructor(props) {
        super(props)

        store.subscribe(() => {
            const state = store.getState()
            console.log(state)
            this.setState({
                ...state
            })
        })
    }
    render() {
        const today = getToday()
        const { title, author, location } = this.state
        return (
            <div className="page-header">
                {title ?
                    <h1>{title}</h1>
                    : ''}
                <div
                    style={{
                        color: '#888',
                        //fontSize: '1px'
                    }}
                >
                    {author ?
                        <span>
                            作者：{author}  {getToday()}
                        </span>
                        : ''}
                    {location ?
                        <span>
                            地区：{location}
                        </span>
                        : ''}
                </div>
            </div>
        )
    }
}


const Decorate = connect()(PageHeader)

PageHeader = props => (
    <Provider store={store}>
        <Decorate {...props} />
    </Provider>
)

export default PageHeader