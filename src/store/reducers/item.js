import actionTypes from '../actions/action_types'

const initialState = {
    data: []
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_DATA:
            return Object.assign({}, state, {
                data: action.data
            })

        default:
            return {
                ...state
            }
    }
}

export { itemReducer };