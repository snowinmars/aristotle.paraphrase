export const read_chapter = (text) => text.split('\n\n').filter(_ => _);
export const read_notes  = (text) => read_chapter(text);