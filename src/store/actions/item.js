import actionTypes from './action_types';

// Set new items on list
const rdxSetNewData = (param) => {
    return {
        type: actionTypes.SET_NEW_DATA,
        data: param,
    }
}

export { rdxSetNewData };