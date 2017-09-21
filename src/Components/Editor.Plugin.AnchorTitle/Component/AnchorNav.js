import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deepPurple400, orange500 } from 'material-ui/styles/colors'


const mapStateToProps = state => {
    return {
        navData: state.anchorNav
    }
}

class AnchorNav extends Component {
    constructor(props) {
        super(props)
        console.log(props)

        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY
            document.querySelectorAll('.anchor-title').forEach((item, index) => {
                const rect = item.getBoundingClientRect(),
                    top = rect.top,
                    name = item.getAttribute('name')
                // fromA = $('.nav-tab').find('li>a[data-target=' + name + ']');

                /* if (scrollTop >= top) {
                    fromA.parent().addClass('active').siblings().removeClass('active');
                } */
            })
        })
    }
    navigate = (e, id) => {
        const target = document.querySelector(`.anchor-title[name='${id}']`)
        const top = document.documentElement.scrollTop + target.getBoundingClientRect().top
        console.log(top)
        window.scrollTo(0, top)
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState)
    }
    render() {
        const lis = []
        // const navData = this.props.navData || this.props.state.
        for (const key in this.props.navData) {
            lis.push(
                <li
                    key={key}
                    onClick={(e) => this.navigate(e, key)}
                    style={{
                    }}
                >
                    {this.props.navData[key]}
                </li>
            )
        }
        return (
            <div className="anchor-nav">
                <ul className="anchor-nav-list">
                    {lis}
                </ul>
            </div>
        );
    }
}

AnchorNav = connect(mapStateToProps)(AnchorNav)

export default AnchorNav;