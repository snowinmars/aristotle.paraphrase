import b1_c1_text from './b1_c1';
import b1_c2_text from './b1_c2';
import {read_chapter} from '../_lib/common'

const chapter_1_1 = {
    id: "origin_b1_c1",
    title: "Глава первая",
    origin_paragraphs: read_chapter(b1_c1_text)
};

const chapter_1_2 = {
    id: "origin_b1_c2",
    title: "Глава вторая",
    origin_paragraphs: read_chapter(b1_c2_text)
};

export default {
    id: "origin_book_1",
    title: "Книга первая",
    chapters: [
        chapter_1_1,
        chapter_1_2
    ]
};