const header = (state = {
    title: '',
    author: '',
    location: '',
    cover: '',
    date: '',
}, action) => {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'CHANGE_AUTHOR':
            return {
                ...state,
                author: action.author
            }
        case 'CHANGE_LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'CHANGE_COVER':
            return {
                ...state,
                cover: action.cover
            }
        default:
            return state
    }
}

export default header