const anchorNav = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ANCHOR_NAV':
            for (const key in action.navData) {
                state[key] = action.navData[key]
            }
            return {...state}
        default:
            return state
    }
}

export default anchorNav