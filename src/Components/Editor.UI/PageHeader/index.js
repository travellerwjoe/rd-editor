import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
// import reducer from '../Header/reducer'
import { store } from '../Header'
// import { createStore, combineReducers } from 'redux'

// let store = createStore(reducer)



class PageHeader extends Component {
    state = {
        ...(store.getState())
    }
    constructor(props) {
        super(props)

        store.subscribe(() => {
            const state = store.getState()
            this.setState({
                ...state
            })
            typeof props.onChange === 'function' && props.onChange(state)
        })
    }
    render() {
        const { title, author, location, date } = this.state
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
                            作者：{author}  {date}
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