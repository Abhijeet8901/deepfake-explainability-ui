import { PRELOAD_SURVEY_DATA } from "../Store"
import { 
    RUN_STEP1X_FAILURE, 
    RUN_STEP1X_REQUEST, 
    RUN_STEP1X_SUCCESS 
} from "./ActionType"

const initialState = {
    generated_image: null,
    loading: false,
    error: null
}

export const step1XReducer = (state = initialState, action) => {
    switch (action.type) {
        case RUN_STEP1X_REQUEST:
            return { ...state, loading: true }
        case RUN_STEP1X_SUCCESS:
            return { ...state, loading: false, generated_image: action.payload}
        case RUN_STEP1X_FAILURE:
            return { ...state, loading: false, error: action.payload.error}
        case PRELOAD_SURVEY_DATA:
            return { ...state, generated_image: action.currentImage.reconstructedImage}    
        default:
            return state;
    }
}
