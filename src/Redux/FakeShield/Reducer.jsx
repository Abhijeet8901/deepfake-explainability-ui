import { 
    RUN_FAKESHIELD_DTE_FAILURE, 
    RUN_FAKESHIELD_DTE_REQUEST, 
    RUN_FAKESHIELD_DTE_SUCCESS,
    RUN_FAKESHIELD_MFLM_FAILURE, 
    RUN_FAKESHIELD_MFLM_REQUEST, 
    RUN_FAKESHIELD_MFLM_SUCCESS  
} from "./ActionType"

// const complex_exp = `1. Whether the picture has been tampered with / Description of the tampered area: The picture has been tampered with. The tampering is located in the central region of the image, extending slightly to the right side. It involves the central teddy bear, specifically affecting its torso and part of its arms.

// 2. Judgment basis: The tampering is evident due to several factors:
// - Lighting: The lighting on the tampered area does not match the rest of the image. The shadows and highlights on the bear's fur are inconsistent with the lighting on the other bears.
// - Edges: The edges around the tampered area appear unnaturally smooth and lack the texture present in the rest of the image, suggesting a blending or cloning tool has been used.
// - Resolution: There is a noticeable difference in resolution and texture within the tampered area compared to the surrounding areas, indicating that the bear's torso may have been digitally altered or replaced.
// - Perspective relationship: The perspective of the tampered bear's torso seems slightly off when compared to the other bears, which could indicate manipulation.
// - Shadows: The shadows cast by the bear within the tampered area do not align with the light source and shadow patterns observed on the other bears, suggesting that the bear's image has been altered.
// - Physical laws: The overall appearance of the bear's torso within the tampered area seems unnatural and does not conform to the expected texture and contours of a real teddy bear's body.`

const initialState = {
    label: null,
    complex_explanation: null,
    mask: null,
    loading: false,
    error: null
}

export const fakeShieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case RUN_FAKESHIELD_DTE_REQUEST:
            return { ...state, loading: true }
        case RUN_FAKESHIELD_DTE_SUCCESS:
            return { ...state, loading: false, complex_explanation: action.payload}
        case RUN_FAKESHIELD_DTE_FAILURE:
            return { ...state, loading: false, error: action.payload}
        case RUN_FAKESHIELD_MFLM_REQUEST:
            return { ...state, loading: true }
        case RUN_FAKESHIELD_MFLM_SUCCESS:
            return { ...state, loading: false, label: action.payload.label, mask: action.payload.mask }
        case RUN_FAKESHIELD_MFLM_FAILURE:
            return { ...state, loading: false, error: action.payload }               
        default:
            return state;
    }
}