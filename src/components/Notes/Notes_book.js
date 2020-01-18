import b1_c1_notes from './b1_c1.notes';
import b1_c2_notes from './b1_c2.note';
import {read_notes} from '../_lib/common'

const chapter_1_1 = {
    id: "chapter_1_1",
    title: "Примечания к первой главе",
    origin_paragraphs: read_notes(b1_c1_notes)
                                    
};

const chapter_1_2 = {
    id: "chapter_1_2",
    title: "Примечания ко второй главе",
    origin_paragraphs: read_notes(b1_c2_notes)
};

export default {
    id: "notes_book_1",
    title: "",
    chapters: [
        chapter_1_1,
        chapter_1_2
    ]
};