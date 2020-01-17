import { HIGHLIGHT_PARAGRAPH_REDUCER_TYPE } from "../constants/types";

export function highlight_paragraph(hovered_paragraph) {
    console.log('action')
    
    return { type: HIGHLIGHT_PARAGRAPH_REDUCER_TYPE, payload: { hovered_paragraph } }
}
