import b1_c1_rus from './b1/rus/b1_c1';
import b1_c2_rus from './b1/rus/b1_c2';
import b1_c3_rus from './b1/rus/b1_c3';
import b1_c4_rus from './b1/rus/b1_c4';
import b1_c5_rus from './b1/rus/b1_c5';
import b1_c6_rus from './b1/rus/b1_c6';
import b1_c7_rus from './b1/rus/b1_c7';
import b1_c8_rus from './b1/rus/b1_c8';
import b1_c9_rus from './b1/rus/b1_c9';
import b1_c10_rus from './b1/rus/b1_c10';

import b1_c1_eng from './b1/eng/b1_c1';
import b1_c2_eng from './b1/eng/b1_c2';
import b1_c3_eng from './b1/eng/b1_c3';
import b1_c4_eng from './b1/eng/b1_c4';
import b1_c5_eng from './b1/eng/b1_c5';
import b1_c6_eng from './b1/eng/b1_c6';
import b1_c7_eng from './b1/eng/b1_c7';
import b1_c8_eng from './b1/eng/b1_c8';
import b1_c9_eng from './b1/eng/b1_c9';
import b1_c10_eng from './b1/eng/b1_c10';

import b1_c1_core from './b1/core/b1_c1';
import b1_c2_core from './b1/core/b1_c2';
import b1_c3_core from './b1/core/b1_c3';
import b1_c4_core from './b1/core/b1_c4';
import b1_c5_core from './b1/core/b1_c5';
import b1_c6_core from './b1/core/b1_c6';
import b1_c7_core from './b1/core/b1_c7';
import b1_c8_core from './b1/core/b1_c8';
import b1_c9_core from './b1/core/b1_c9';
import b1_c10_core from './b1/core/b1_c10';

import b2_c1_text from './b2/rus/b2_c1';
import b2_c2_text from './b2/rus/b2_c2';

import {read_chapter} from '../_lib/common'

const chapter_1_1 = {
    id: "origin_b1_c1",
    title: "Глава первая",
    origin_paragraphs: read_chapter(b1_c1_rus),
    eng_paragraphs: read_chapter(b1_c1_eng),
    core: b1_c1_core,
};

const chapter_1_2 = {
    id: "origin_b1_c2",
    title: "Глава вторая",
    origin_paragraphs: read_chapter(b1_c2_rus),
    eng_paragraphs: read_chapter(b1_c2_eng),
    core: b1_c2_core,
};

const chapter_1_3 = {
    id: "origin_b1_c3",
    title: "Глава третья",
    origin_paragraphs: read_chapter(b1_c3_rus),
    eng_paragraphs: read_chapter(b1_c3_eng),
    core: b1_c3_core,
};

const chapter_1_4 = {
    id: "origin_b1_c4",
    title: "Глава четвёртая",
    origin_paragraphs: read_chapter(b1_c4_rus),
    eng_paragraphs: read_chapter(b1_c4_eng),
    core: b1_c4_core,
};

const chapter_1_5 = {
    id: "origin_b1_c5",
    title: "Глава пятая",
    origin_paragraphs: read_chapter(b1_c5_rus),
    eng_paragraphs: read_chapter(b1_c5_eng),
    core: b1_c5_core,
};

const chapter_1_6 = {
    id: "origin_b1_c6",
    title: "Глава шестая",
    origin_paragraphs: read_chapter(b1_c6_rus),
    eng_paragraphs: read_chapter(b1_c6_eng),
    core: b1_c6_core,
};

const chapter_1_7 = {
    id: "origin_b1_c7",
    title: "Глава седьмая",
    origin_paragraphs: read_chapter(b1_c7_rus),
    eng_paragraphs: read_chapter(b1_c7_eng),
    core: b1_c7_core,
};

const chapter_1_8 = {
    id: "origin_b1_c8",
    title: "Глава восьмая",
    origin_paragraphs: read_chapter(b1_c8_rus),
    eng_paragraphs: read_chapter(b1_c8_eng),
    core: b1_c8_core,
};

const chapter_1_9 = {
    id: "origin_b1_c9",
    title: "Глава девятая",
    origin_paragraphs: read_chapter(b1_c9_rus),
    eng_paragraphs: read_chapter(b1_c9_eng),
    core: b1_c9_core,
};

const chapter_1_10 = {
    id: "origin_b1_c10",
    title: "Глава десятая",
    origin_paragraphs: read_chapter(b1_c10_rus),
    eng_paragraphs: read_chapter(b1_c10_eng),
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
