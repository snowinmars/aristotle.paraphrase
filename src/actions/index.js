import { HIGHLIGHT_PARAGRAPH_REDUCER_TYPE, TOGGLE_ADDITIONAL_TEXT_REDUCER_TYPE } from "../constants/types";

export function highlight_paragraph(settings) {
    return { type: HIGHLIGHT_PARAGRAPH_REDUCER_TYPE, payload: { settings } }
}

export function toggle_additional_text(settings) {
    return { type: TOGGLE_ADDITIONAL_TEXT_REDUCER_TYPE, payload: { settings } }
}
