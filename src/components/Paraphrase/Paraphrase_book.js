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

import b2_c1_rus from "./b2/rus/b2_c1";
import b2_c2_rus from "./b2/rus/b2_c2";

import {read_chapter} from '../_lib/common';

const chapter_1_1 = {
    id: "paraphrase_b1_c1",
    title: "Умение и искусство",
    origin_paragraphs: read_chapter(b1_c1_rus)
};

const chapter_1_2 = {
    id: "paraphrase_b1_c2",
    title: "Мудрость",
    origin_paragraphs: read_chapter(b1_c2_rus)
};

const chapter_1_3 = {
    id: "paraphrase_b1_c3",
    title: "Первопричины вещей",
    origin_paragraphs: read_chapter(b1_c3_rus)
};

const chapter_1_4 = {
    id: "paraphrase_b1_c4",
    title: "Первопричины изменения вещей",
    origin_paragraphs: read_chapter(b1_c4_rus)
};

const chapter_1_5 = {
    id: "paraphrase_b1_c5",
    title: "Пифагорейцы",
    origin_paragraphs: read_chapter(b1_c5_rus)
};

const chapter_1_6 = {
    id: "paraphrase_b1_c6",
    title: "Платонизм",
    origin_paragraphs: read_chapter(b1_c6_rus)
};

const chapter_1_7 = {
    id: "paraphrase_b1_c7",
    title: "Проблемы",
    origin_paragraphs: read_chapter(b1_c7_rus)
};

const chapter_1_8 = {
    id: "paraphrase_b1_c8",
    title: "У пифагорейцев: числа - это не первоначала",
    origin_paragraphs: read_chapter(b1_c8_rus)
};

const chapter_1_9 = {
    id: "paraphrase_b1_c9",
    title: "У платонистов: эйдосов нет",
    origin_paragraphs: read_chapter(b1_c9_rus)
};

const chapter_1_10 = {
    id: "paraphrase_b1_c10",
    title: "Выводы",
    origin_paragraphs: read_chapter(b1_c10_rus)
};

const chapter_2_1 = {
    id: "paraphrase_b2_c1",
    title: "Глава первая",
    origin_paragraphs: read_chapter(b2_c1_rus)
};

const chapter_2_2 = {
    id: "paraphrase_b2_c2",
    title: "Глава вторая",
    origin_paragraphs: read_chapter(b2_c2_rus)
};

export default {
    books: [{
        id: "paraphrase_book_1",
        title: "Парафраз: причины.",
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
        id: "paraphrase_book_2",
        title: "Парафраз: книга вторая",
        chapters: [
            chapter_2_1,
            chapter_2_2,
        ]
    }]
};
