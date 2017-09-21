const anchorNav = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ANCHOR_NAV':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title
                }
            ]
        default:
            return state
    }
}

export default anchorNav