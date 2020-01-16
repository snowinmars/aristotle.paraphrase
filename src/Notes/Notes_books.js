import b1_c1_notes from './b1_c1.notes';

const chapter_1_1 = {
    id: "chapter_1_1",
    title: "Примечания к первой главе",
    origin_paragraphs: b1_c1_notes.split('\n')
                                    .filter(_ => _)
                                    .map((note, i) => `[${i + 1}] ${note}`)
};

const book_1 = {
    id: "notes_book_1",
    title: "",
    chapters: [
        chapter_1_1
    ]
};

const Notes_books = [
    book_1
];


export default Notes_books;