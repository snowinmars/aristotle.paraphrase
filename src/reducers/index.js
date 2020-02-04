import { HIGHLIGHT_PARAGRAPH_REDUCER_TYPE, TOGGLE_ADDITIONAL_TEXT_REDUCER_TYPE } from "../constants/types";

const initialState = {
    hovered_paragraph: null,
    isAdditionalTextVisible: true,
    from: {},
    to: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case HIGHLIGHT_PARAGRAPH_REDUCER_TYPE:
            return {
                ...state,
                from: action.payload.settings.from,
                to: action.payload.settings.to,
            };
        case TOGGLE_ADDITIONAL_TEXT_REDUCER_TYPE:
            return {
                ...state,
                isAdditionalTextVisible: action.payload.settings.isAdditionalTextVisible,
            };
        default:
            return state;
    }
}

export default rootReducer;
