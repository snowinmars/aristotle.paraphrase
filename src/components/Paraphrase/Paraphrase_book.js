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
    id: "paraphrase_b1_c1",
    title: "Умение и искусство",
    origin_paragraphs: read_chapter(b1_c1_text)
};

const chapter_1_2 = {
    id: "paraphrase_b1_c2",
    title: "Мудрость",
    origin_paragraphs: read_chapter(b1_c2_text)
};

const chapter_1_3 = {
    id: "paraphrase_b1_c3",
    title: "Первопричины вещей",
    origin_paragraphs: read_chapter(b1_c3_text)
};

const chapter_1_4 = {
    id: "paraphrase_b1_c4",
    title: "Первопричины изменеия вещей",
    origin_paragraphs: read_chapter(b1_c4_text)
};

const chapter_1_5 = {
    id: "paraphrase_b1_c5",
    title: "Пифагорейцы",
    origin_paragraphs: read_chapter(b1_c5_text)
};

const chapter_1_6 = {
    id: "paraphrase_b1_c6",
    title: "Платонизм",
    origin_paragraphs: read_chapter(b1_c6_text)
};

const chapter_1_7 = {
    id: "paraphrase_b1_c7",
    title: "Глава седьмая",
    origin_paragraphs: read_chapter(b1_c7_text)
};

const chapter_1_8 = {
    id: "paraphrase_b1_c8",
    title: "Проблемы у пифагорейцев: числа - это не первоначала",
    origin_paragraphs: read_chapter(b1_c8_text)
};

const chapter_1_9 = {
    id: "paraphrase_b1_c9",
    title: "Проблемы у платонистов: эйдосов нет",
    origin_paragraphs: read_chapter(b1_c9_text)
};

const chapter_1_10 = {
    id: "paraphrase_b1_c10",
    title: "Выводы",
    origin_paragraphs: read_chapter(b1_c10_text)
};

export default {
    id: "paraphrase_book_1",
    title: "Философия - наука о причинах",
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
