import { HIGHLIGHT_PARAGRAPH_REDUCER_TYPE } from "../constants/types";

const initialState = {
    hovered_paragraph: null
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case HIGHLIGHT_PARAGRAPH_REDUCER_TYPE:
            return {
                ...state,
                from: action.payload.settings.from,
                to: action.payload.settings.to,
            };
        default:
            return state;
    }
}

export default rootReducer;
