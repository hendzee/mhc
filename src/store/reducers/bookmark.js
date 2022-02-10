import actionTypes from '../actions/action_types'

const initialState = {
    data: []
}

const bookmarkReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BOOKMARK:
            if (state.data.includes(action.data)) {
                let filteredData = state.data.filter(item => item != action.data)

                return {
                    ...state,
                    data: filteredData
                }

            } else {

                return {
                    ...state,
                    data: [...state.data, action.data]
                }
            }

        case actionTypes.SET_DATA_BOOKMARK:
            return Object.assign({}, state, {
                data: action.data
            })

        default:
            return {
                ...state
            }
    }
}

export { bookmarkReducer };