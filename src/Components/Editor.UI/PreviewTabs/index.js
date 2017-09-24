import React, { Component } from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import FontIcon from 'material-ui/FontIcon'
import Provider from '../Provider'
import { isPreviewMode } from '#/Editor.Core/selector/display'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import VelocityComponent from 'velocity-react/velocity-component'
import 'velocity-animate'

const mapStateToProps = createStructuredSelector({
    isPreviewMode
})

class PreviewTabs extends Component {
    state = {
        mode: 'PC'
    }
    constructor(props) {
        super(props)
    }
    toggleEditor(isPreviewMode, mode) {
        const editable = document.getElementById('editable')
        const anchorNav = document.querySelector('.anchor-nav')

        if (isPreviewMode && mode !== 'PC') {
            editable.style.display = 'none'
            anchorNav.style.display = 'none'
        } else {
            editable.style.display = 'block'
            anchorNav.style.display = 'block'
        }
    }
    componentDidMount() {
        this.toggleEditor(this.props.isPreviewMode, this.state.mode)
    }
    componentWillUpdate(nextProps, nextState) {
        this.toggleEditor(nextProps.isPreviewMode, nextState.mode)
    }
    handleChange = (value) => {
        this.setState({
            mode: value
        })
    }
    render() {
        const animation = this.props.isPreviewMode ? { opacity: 1, translateY: '0px' } : { opacity: 0, translateY: '-75px' }
        return (
            <VelocityComponent animation={animation} duration={500}>
                <Tabs
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%'
                    }}
                    onChange={this.handleChange}
                    value={this.state.mode}
                >
                    <Tab
                        label="PC"
                        icon={<FontIcon className="material-icons">computer</FontIcon>}
                        value="PC"
                    >

                    </Tab>
                    <Tab
                        label="iPhone"
                        icon={<FontIcon className="material-icons">phone_iphone</FontIcon>}
                        value="iPhone"
                    >
                        <iframe src="./output.html"></iframe>
                    </Tab>
                    <Tab
                        label="iPad"
                        icon={<FontIcon className="material-icons">tablet_mac</FontIcon>}
                        value="iPad"
                    >
                        <iframe src="./output.html"></iframe>
                    </Tab>
                </Tabs>
            </VelocityComponent>
        )
    }
}

const Decorate = connect(mapStateToProps)(PreviewTabs)

PreviewTabs = (props) => (
    <Provider {...props}>
        <Decorate {...props} />
    </Provider>
)

export default PreviewTabs