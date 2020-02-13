import b1_c1_notes from './b1_notes/b1_c1.notes';
import b1_c2_notes from './b1_notes/b1_c2.notes';
import b1_c3_notes from './b1_notes/b1_c3.notes';
import b1_c4_notes from './b1_notes/b1_c4.notes';
import b1_c5_notes from './b1_notes/b1_c5.notes';
import b1_c6_notes from './b1_notes/b1_c6.notes';
import b1_c7_notes from './b1_notes/b1_c7.notes';
import b1_c8_notes from './b1_notes/b1_c8.notes';
import b1_c9_notes from './b1_notes/b1_c9.notes';
import b1_c10_notes from './b1_notes/b1_c10.notes';

import b2_c1_notes from './b2_notes/b2_c1.notes';
import b2_c2_notes from './b2_notes/b2_c2.notes';

import {read_notes} from '../_lib/common'

const chapter_1_1 = {
    id: "origin-notes_b1_c1",
    title: "К оригиналу первой главы",
    origin_paragraphs: read_notes(b1_c1_notes)

};

const chapter_1_2 = {
    id: "origin-notes_b1_c2",
    title: "К оригиналу второй главы",
    origin_paragraphs: read_notes(b1_c2_notes)
};

const chapter_1_3 = {
    id: "origin-notes_b1_c3",
    title: "К оригиналу третьей главы",
    origin_paragraphs: read_notes(b1_c3_notes)
};

const chapter_1_4 = {
    id: "origin-notes_b1_c4",
    title: "К оригиналу четвёртой главы",
    origin_paragraphs: read_notes(b1_c4_notes)
};

const chapter_1_5 = {
    id: "origin-notes_b1_c5",
    title: "К оригиналу пятой главы",
    origin_paragraphs: read_notes(b1_c5_notes)
};

const chapter_1_6 = {
    id: "origin-notes_b1_c6",
    title: "К оригиналу шестой главы",
    origin_paragraphs: read_notes(b1_c6_notes)
};

const chapter_1_7 = {
    id: "origin-notes_b1_c7",
    title: "К оригиналу седьмой главы",
    origin_paragraphs: read_notes(b1_c7_notes)
};

const chapter_1_8 = {
    id: "origin-notes_b1_c8",
    title: "К оригиналу восьмой главы",
    origin_paragraphs: read_notes(b1_c8_notes)
};

const chapter_1_9 = {
    id: "origin-notes_b1_c9",
    title: "К оригиналу девятой главы",
    origin_paragraphs: read_notes(b1_c9_notes)
};

const chapter_1_10 = {
    id: "origin-notes_b1_c10",
    title: "К оригиналу десятой главы",
    origin_paragraphs: read_notes(b1_c10_notes)
};

const chapter_2_1 = {
    id: "origin-notes_b2_c1",
    title: "К оригиналу первой главы",
    origin_paragraphs: read_notes(b2_c1_notes)
};

const chapter_2_2 = {
    id: "origin-notes_b2_c2",
    title: "К оригиналу второй главы",
    origin_paragraphs: read_notes(b2_c2_notes)
};


export default {
    books: [{
        id: "origin-notes_book_1",
        title: "",
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
        id: "origin-notes_book_2",
        title: "",
        chapters: [
            chapter_2_1,
            chapter_2_2,
        ]
    }]
};
