import b1_c1_text from './b1_c1';
import b1_c2_text from './b1_c2';
import b1_c3_text from './b1_c3';
import b1_c4_text from './b1_c4';
import b1_c5_text from './b1_c5';
import b1_c6_text from './b1_c6';
import b1_c7_text from './b1_c7';
import b1_c8_text from './b1_c8';
import b1_c9_text from './b1_c9';
import b1_c10_text from './b1_c10';
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

const chapter_1_3 = {
    id: "origin_b1_c3",
    title: "Глава третья",
    origin_paragraphs: read_chapter(b1_c3_text)
};

const chapter_1_4 = {
    id: "origin_b1_c4",
    title: "Глава четвёртая",
    origin_paragraphs: read_chapter(b1_c4_text)
};

const chapter_1_5 = {
    id: "origin_b1_c5",
    title: "Глава пятая",
    origin_paragraphs: read_chapter(b1_c5_text)
};

const chapter_1_6 = {
    id: "origin_b1_c6",
    title: "Глава шестая",
    origin_paragraphs: read_chapter(b1_c6_text)
};

const chapter_1_7 = {
    id: "origin_b1_c7",
    title: "Глава седьмая",
    origin_paragraphs: read_chapter(b1_c7_text)
};

const chapter_1_8 = {
    id: "origin_b1_c8",
    title: "Глава восьмая",
    origin_paragraphs: read_chapter(b1_c8_text)
};

const chapter_1_9 = {
    id: "origin_b1_c9",
    title: "Глава девятая",
    origin_paragraphs: read_chapter(b1_c9_text)
};

const chapter_1_10 = {
    id: "origin_b1_c10",
    title: "Глава десятая",
    origin_paragraphs: read_chapter(b1_c10_text)
};

export default {
    id: "origin_book_1",
    title: "Книга первая",
    chapters: [
        chapter_1_1,
        chapter_1_2,
        chapter_1_3,
        chapter_1_4,
        chapter_1_5,
        chapter_1_6,
        chapter_1_7,
        chapter_1_8,
        chapter_1_9,
        chapter_1_10,
    ]
};
