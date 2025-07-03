import { 
    GET_USER_PROGRESS_REQUEST, 
    GET_USER_PROGRESS_SUCCESS,
    GET_USER_PROGRESS_FAILURE
} from "./ActionType"

const initialState = {
    loading: false,
    lastImageIndex: 0,
    finalfinalCompleted: false
}

export const userProgressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROGRESS_REQUEST:
            return { ...state, loading: true }
        case GET_USER_PROGRESS_SUCCESS:
            return { ...state, loading: false, lastImageIndex: action.payload.lastImageIndex, finalCompleted: action.payload.finalCompleted }
        case GET_USER_PROGRESS_FAILURE:
            return { ...state, loading: false }
        default:
            return state;
    }
}
