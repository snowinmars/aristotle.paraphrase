const Paraphrase_books = require('./src/components/Paraphrase/Paraphrase_book');
const Paraphrase_notes = require('./src/components/Paraphrase/Paraphrase_book.notes');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5002;
var os = require("os");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('aristotel api host');
});

app.get('/api/paraphrase', (req, res) => {
    res.send(Paraphrase_books.default);
});

app.get('/api/paraphrase/notes', (req, res) => {
    res.send(Paraphrase_notes.default);
});

app.get('/api/paraphrase/merge', (req, res) => {
    const item = Paraphrase_books.default;

    const books = item.books.map(map_book);

    res.send({books: books});
});

app.get('/api/paraphrase/merge/download', (req, res) => {
    const item = Paraphrase_books.default;

    const books = item.books.map(map_book);
    const text = map_books_to_plain_text(books);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-disposition', 'attachment; filename=file.txt');

    res.send(text)
});

app.listen(port, () => console.log(`Listening on ${os.hostname()}:${port}`));

///

map_books_to_plain_text = (books) => {
    let text = '';

    text += 'Аристотель. Парафраз.\n\n';
    text += `См. https://aristotel-paraphrase.sloppy.zone\n\n`;

    books.map(book => {
        text += `Книга: ${book.title}\n\n`;

        book.chapters.map(chapter => {
            text += `### \n Глава: ${chapter.title}\n\n`;

            chapter.paragraphs.map(paragraph => {
                text += `${paragraph}\n`;
            });

            text += `\n\n Примечания к главе "${chapter.title}"\n\n`;

            chapter.notes.map(note => {
                text += `${note}\n`;
            });

            text += '\n\n';
        })
    });

    return text.replace(/<[^\/].*?>/g, ' [ ').replace(/<\/.*?>/g, ' ] ');
};

map_book = (book, book_index) => {
    const chapters = book.chapters.map((chapter, chapter_index) => map_chapter(chapter, chapter_index, book_index));

    return {
        title: book.title,
        chapters: chapters
    }
};

map_chapter = (chapter, chapter_index, book_index) => {
    const paragraphs = chapter.origin_paragraphs.map(map_paragraph);

    const notes = Paraphrase_notes.default
        .books[book_index]
        .chapters[chapter_index]
        .origin_paragraphs
        .map(map_paragraph);

    return {
        title: chapter.title,
        paragraphs: paragraphs,
        notes: notes
    }
};

map_paragraph = (paragraph) => {
    const parts = paragraph.split('\n');
    return parts[parts.length - 1];
};
