import b1_c1_notes from './b1_c1.notes';
import b1_c2_notes from './b1_c2.note';

const chapter_1_1 = {
    id: "chapter_1_1",
    title: "Примечания к первой главе",
    origin_paragraphs: b1_c1_notes.split('\n')
                                    .filter(_ => _)
                                    .map((note, i) => `[${i + 1}] ${note}`)
};

const chapter_1_2 = {
    id: "chapter_1_2",
    title: "Примечания ко второй главе",
    origin_paragraphs: b1_c2_notes.split('\n')
        .filter(_ => _)
        .map((note, i) => `[${i + 1}] ${note}`)
};

export default {
    id: "notes_book_1",
    title: "",
    chapters: [
        chapter_1_1,
        chapter_1_2
    ]
};