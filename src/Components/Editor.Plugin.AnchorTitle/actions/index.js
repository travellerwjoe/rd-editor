export const addAnchorNav = navData => {
    return {
        type: 'ADD_ANCHOR_NAV',
        navData
    }
}

export const delAnchorNav = id => {
    return {
        type: 'DEL_ANCHOR_NAV',
        id
    }
}