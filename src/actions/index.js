import { HIGHLIGHT_PARAGRAPH_REDUCER_TYPE } from "../constants/types";

export function highlight_paragraph(settings) {
    return { type: HIGHLIGHT_PARAGRAPH_REDUCER_TYPE, payload: { settings } }
}
