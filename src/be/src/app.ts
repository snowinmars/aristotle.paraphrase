import express, {Request, Response} from "express";
import {buildBooks, push, updateRamParagraph, validParagraph} from "./functions.js";
import cors from "cors";
import bodyParser from "body-parser";
import pino from 'pino';
import {Book, Chapter} from "./types";

const forbidAuth = false;

const logger = pino({ level: 'info' });

const app = express();
app.use(cors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
}));
const jsonParser = bodyParser.json();

app.set('port', 5000);

let books = await buildBooks();

app.get('/api/health', (request: Request, response: Response) => {
    return response.status(200).json('{"healthy": true}');
});

app.get('/api/books', (request: Request, response: Response) => {
    return response.status(200).json(books.map((book: Book): Book => {
        return {
            id: book.id,
            key: book.key,
            headers: book.headers,
            chapters: []
        }
    }));
});

app.get('/api/books/:bookId', (request: Request, response: Response) => {
    const bookId = parseInt(request.params.bookId);
    const book = books.filter(x => x.id === bookId)[0];
    if (!book) return response.status(404).json({});

    return response.status(200).json({
        id: book.id,
        key: book.key,
        headers: book.headers,
        chapters: book.chapters.map((chapter: Chapter): Chapter => {
            return {
                id: chapter.id,
                key: chapter.key,
                qBitSkyEpigraph: chapter.qBitSkyEpigraph,
                rossEpigraph: chapter.rossEpigraph,
                paragraphs: [],
            }
        }),
    });
});

app.get('/api/books/:bookId/:chapterId', (request: Request, response: Response) => {
    const bookId = parseInt(request.params.bookId);
    const chapterId = parseInt(request.params.chapterId);

    const book = books.filter(x => x.id === bookId)[0];
    if (!book) return response.status(404).json({});

    const chapter = book?.chapters.filter(x => x.id === chapterId)[0];
    if (!chapter) return response.status(404).json({});

    return response.status(200).json(chapter);
});

app.post('/api/books/rebuild', async (request: Request, response: Response) => {
    if (forbidAuth) return response.status(403).json({}); // disable for prod, wait for auth

    books = await buildBooks();

    return response.status(200).json({});
});

app.post('/api/books/:bookId/:chapterId/:paragraphId', jsonParser, (request: Request, response: Response) => {
    if (forbidAuth) return response.status(403).json({}); // disable for prod, wait for auth

    const bookId = parseInt(request.params.bookId);
    const chapterId = parseInt(request.params.chapterId);
    const paragraphId = parseInt(request.params.paragraphId);
    const {header, text} = request.body;

    const book = books.filter(x => x.id === bookId)[0];
    if (!book) return response.status(404).json({});

    const chapter = book.chapters.filter(x => x.id === chapterId)[0];
    if (!chapter) return response.status(404).json({});

    const paragraph = chapter.paragraphs.filter(x => x.id === paragraphId)[0];
    if (!paragraph) return response.status(404).json({});

    if (!validParagraph(text)) {
        logger.warn('A paragraph fails in validation %s %s %s %s %s', bookId, chapterId, paragraphId, header, text);
        return response.status(406).json({});
    }

    updateRamParagraph(paragraph.text, header, text);
    push({bookId, chapterId, paragraphId, header, text})

    return response.status(200).json(text);
});

const port = app.get('port');
app.listen(port, () => {
    logger.info('Server is running on http://localhost:%s', port);
});

export {};
