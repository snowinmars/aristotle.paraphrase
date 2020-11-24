import b1_c1_text from './b1/b1_c1';
import b1_c2_text from './b1/b1_c2';
import b1_c3_text from './b1/b1_c3';
import b1_c4_text from './b1/b1_c4';
import b1_c5_text from './b1/b1_c5';
import b1_c6_text from './b1/b1_c6';
import b1_c7_text from './b1/b1_c7';
import b1_c8_text from './b1/b1_c8';
import b1_c9_text from './b1/b1_c9';
import b1_c10_text from './b1/b1_c10';

import b1_c1_core from './b1_core/b1_c1.core';
import b1_c2_core from './b1_core/b1_c2.core';
import b1_c3_core from './b1_core/b1_c3.core';
import b1_c4_core from './b1_core/b1_c4.core';
import b1_c5_core from './b1_core/b1_c5.core';
import b1_c6_core from './b1_core/b1_c6.core';
import b1_c7_core from './b1_core/b1_c7.core';
import b1_c8_core from './b1_core/b1_c8.core';
import b1_c9_core from './b1_core/b1_c9.core';
import b1_c10_core from './b1_core/b1_c10.core';

import b2_c1_text from './b2/b2_c1';
import b2_c2_text from './b2/b2_c2';

import {read_chapter} from '../_lib/common'

const chapter_1_1 = {
    id: "origin_b1_c1",
    title: "Глава первая",
    origin_paragraphs: read_chapter(b1_c1_text),
    core: b1_c1_core,
};

const chapter_1_2 = {
    id: "origin_b1_c2",
    title: "Глава вторая",
    origin_paragraphs: read_chapter(b1_c2_text),
    core: b1_c2_core,
};

const chapter_1_3 = {
    id: "origin_b1_c3",
    title: "Глава третья",
    origin_paragraphs: read_chapter(b1_c3_text),
    core: b1_c3_core,
};

const chapter_1_4 = {
    id: "origin_b1_c4",
    title: "Глава четвёртая",
    origin_paragraphs: read_chapter(b1_c4_text),
    core: b1_c4_core,
};

const chapter_1_5 = {
    id: "origin_b1_c5",
    title: "Глава пятая",
    origin_paragraphs: read_chapter(b1_c5_text),
    core: b1_c5_core,
};

const chapter_1_6 = {
    id: "origin_b1_c6",
    title: "Глава шестая",
    origin_paragraphs: read_chapter(b1_c6_text),
    core: b1_c6_core,
};

const chapter_1_7 = {
    id: "origin_b1_c7",
    title: "Глава седьмая",
    origin_paragraphs: read_chapter(b1_c7_text),
    core: b1_c7_core,
};

const chapter_1_8 = {
    id: "origin_b1_c8",
    title: "Глава восьмая",
    origin_paragraphs: read_chapter(b1_c8_text),
    core: b1_c8_core,
};

const chapter_1_9 = {
    id: "origin_b1_c9",
    title: "Глава девятая",
    origin_paragraphs: read_chapter(b1_c9_text),
    core: b1_c9_core,
};

const chapter_1_10 = {
    id: "origin_b1_c10",
    title: "Глава десятая",
    origin_paragraphs: read_chapter(b1_c10_text),
    core: b1_c10_core,
};

const chapter_2_1 = {
    id: "origin_b2_c1",
    title: "Глава первая",
    origin_paragraphs: read_chapter(b2_c1_text)
};

const chapter_2_2 = {
    id: "origin_b2_c2",
    title: "Глава вторая",
    origin_paragraphs: read_chapter(b2_c2_text)
};

export default {
    books: [{
        id: "origin_book_1",
        title: "Аристотель: книга первая",
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
    }, {
        id: "origin_book_2",
        title: "Аристотель: книга вторая",
        chapters: [
            chapter_2_1,
            chapter_2_2,
        ]
    }]
};
