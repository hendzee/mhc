import actionTypes from './action_types';

// Bookmark or remove bookmark
const rdxBookmark = (param) => {
    return {
        type: actionTypes.BOOKMARK,
        data: param,
    }
}

// Set local data bookmark if exist
const rdxSetBookmark = (param) => {
    return {
        type: actionTypes.SET_DATA_BOOKMARK,
        data: param,
    }
}

export { rdxBookmark, rdxSetBookmark };