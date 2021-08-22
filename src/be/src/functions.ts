import {existsSync, promises, readFileSync, writeFileSync} from "fs";
import {join} from 'path';
import {Book, Chapter, MultiText, Paragraph, ParagraphHeader} from "./types";
import {resolve} from 'path';
import {execSync} from 'child_process';
import pino from 'pino';

// todo [snow]: wtf is wrong with imports
console.log(process.env)
const isInDocker = process.env.IS_IN_DOCKER?.toLowerCase() === 'true';
const gitKey = process.env.GIT_KEY;

const logger = pino({
    level: 'info',
});

const booksRoot = resolve('./src/data/');
logger.info('Root is %s', booksRoot);

logger.info('Running %s', isInDocker ? 'in docker' : 'out of docker');

const getFilename = (header: ParagraphHeader): string => {
    switch (header) {
        case ParagraphHeader.paraphrase: return 'paraphrase.html';
        case ParagraphHeader.paraphraseNotes: return 'paraphrase.notes.html';
        case ParagraphHeader.qBitSky: return 'qBitSky.html';
        case ParagraphHeader.qBitSkyNotes: return 'qBitSky.notes.html';
        case ParagraphHeader.ross: return 'ross.html';
        case ParagraphHeader.rossNotes: return 'ross.notes.html';
        default: throw new Error(`Unknown paragraph header: ${header}`);
    }
}

export const push = ({bookId, chapterId, paragraphId, header, text} : {
    bookId: number, chapterId: number, paragraphId: number, header: ParagraphHeader, text: string,
}): void => {
    const toId = (n: number): string => n.toString().padStart(2, '0');

    const filename = getFilename(header);

    const filepath = join(booksRoot, `b${toId(bookId)}`, `c${toId(chapterId)}`, `p${toId(paragraphId)}`, filename);

    logger.info('Wrote %s', filepath)

    writeFileSync(filepath, text, {
        encoding: 'utf8',
        flag: 'w',
    })

    git(`add ${filepath}`)
    git(`commit -m "Update ${filepath}"`);
    git(`push`);
}

const git = (command: string, errorAsWarning = false): void => {
    if (!isInDocker) {
        logger.warn('Skipping git due to local env')
        return;
    }

    const cmd = `git --work-tree=${booksRoot} --git-dir=${join(booksRoot, '.git')} ${command}`;
    logger.info('Executing %s', cmd);

    try {
        execSync(cmd);
    } catch (e) {
        if (errorAsWarning) {
            logger.warn(e);
            return;
        }

        throw e;
    }
}

export const validParagraph = (text: string): boolean => {
    return text.search('script') === -1;
}

export const updateRamParagraph = (multiText: MultiText, header: ParagraphHeader, text: string): void => {
    switch (header) {
        case ParagraphHeader.paraphrase: multiText.paraphrase = text; break;
        case ParagraphHeader.paraphraseNotes: multiText.paraphraseNotes = text; break;
        case ParagraphHeader.qBitSky: multiText.qBitSky = text; break;
        case ParagraphHeader.qBitSkyNotes: multiText.qBitSkyNotes = text; break;
        case ParagraphHeader.ross: multiText.ross = text; break;
        case ParagraphHeader.rossNotes: multiText.rossNotes = text; break;
        default: throw new Error(`Enum ParagraphHeader is out of range: ${header}`);
    }
};

export async function buildBooks(): Promise<Book[]> {
    const paths = await walk(booksRoot);
    const books = getBooks(booksRoot, paths.map(x => x.substring(booksRoot.length + 1))); // +1 removes first slash

    logger.info('Build %s books', books.length);
    books.forEach(book => {
        logger.debug('  Book %s with %s chapters', book.id, book.chapters.length);

        book.chapters.forEach(chapter => {
            logger.debug('    Chapter %s with %s paragraphs', chapter.id, chapter.paragraphs.length);
        });
    });

    return books;
}

export async function walk(directory: string): Promise<string[]> {
    let fileList: string[] = [];

    const files = await promises.readdir(directory);

    for (const file of files) {
        const path = join(directory, file);
        const stat = await promises.stat(path);

        if (stat.isDirectory()) {
            fileList = [...fileList, ...(await walk(path))];
        } else {
            fileList.push(path);
        }
    }

    return fileList;
}

export const getBooks = (root: string, paths: string[]): Book[] => {
    const books: Book[] = [];

    paths.sort(x => x.length)
        .reduce((paragraphs: Paragraph[], path: string): Paragraph[] => {
            const isHtml = path.endsWith('.html');
            const isParagraph = isHtml && !path.includes('epigraph');
            const isEpigraph = isHtml && path.includes('epigraph');
            const isSystemFile = !isParagraph && !isEpigraph;

            if (isSystemFile) return paragraphs;

            const fullPath = join(root, path);
            if (!existsSync(fullPath)) throw new Error(`${fullPath} not found`);

            const {bookId, chapterId, paragraphId, filename} = getIds(path);
            const content = readFileSync(fullPath, 'utf8');

            if (isParagraph) {
                const newParagraph = toParagraph(bookId, chapterId, paragraphId!, filename, content);
                const existingParagraph = paragraphs.filter(x => x.key === newParagraph.key).shift();
                const chapter = createRelatedChapter(books, bookId, chapterId);

                if (existingParagraph) {
                    switch (filename) {
                        case 'paraphrase.html': existingParagraph.text.paraphrase = content; break;
                        case 'paraphrase.notes.html': existingParagraph.text.paraphraseNotes = content; break;
                        case 'qBitSky.html': existingParagraph.text.qBitSky = content; break;
                        case 'qBitSky.notes.html': existingParagraph.text.qBitSkyNotes = content; break;
                        case 'ross.html': existingParagraph.text.ross = content; break;
                        case 'ross.notes.html': existingParagraph.text.rossNotes = content; break;
                        default: throw new Error(`Unknown paragraph file name ${filename}`);
                    }
                } else {
                    paragraphs.push(newParagraph);
                    chapter.paragraphs.push(newParagraph);
                }
            }

            if (isEpigraph) {
                const chapter = createRelatedChapter(books, bookId, chapterId);

                switch (filename) {
                    case 'qBitSky.epigraph.html': chapter.qBitSkyEpigraph = content ; break;
                    case 'ross.epigraph.html': chapter.rossEpigraph = content ; break;
                    default: throw new Error(`Unknown epigraph file name ${filename}`);
                }
            }

            return paragraphs;
        }, []);

    return books;
};

const createRelatedChapter = (books: Book[], bookId: number, chapterId: number): Chapter => {
    let book = books.filter(x => x.id === bookId).shift();

    if (!book) {
        book = {
            id: bookId,
            key: `b${bookId}`,
            chapters: [],
            headers: [ParagraphHeader.qBitSky, ParagraphHeader.paraphrase, ParagraphHeader.ross],
        };
        books.push(book);
    }

    let chapter = book.chapters.filter(x => x.id === chapterId).shift();

    if (!chapter) {
        chapter = {
            id: chapterId,
            key: `${book.key}-c${chapterId}`,
            paragraphs: [],
            qBitSkyEpigraph: '',
            rossEpigraph: '',
        };
        book.chapters.push(chapter);
    }

    return chapter;
};

const getIds = (path: string): {bookId: number, chapterId: number, paragraphId: number | undefined, filename: string} => {
    const isWindowsPath = path.includes('\\');
    const isLinuxPath = path.includes('/');

    if (!isWindowsPath && !isLinuxPath) throw new Error(`What are you sending here? Just look at ${path}!`);

    const parts = isWindowsPath ? path.split('\\') : isLinuxPath ? path.split('/') : '';
    const isParagraphPath = parts.length === 4;
    const isEpigraphPath = parts.length === 3;

    if (isParagraphPath) {
        const [bookKey, chapterKey, paragraphKey, filename] = parts;
        return {
            bookId: parseInt(bookKey.slice(1)), // b01 -> 1
            chapterId: parseInt(chapterKey.slice(1)), // c01 -> 1,
            paragraphId: parseInt(paragraphKey.slice(1)), // p01 -> 1
            filename,
        };
    }

    if (isEpigraphPath) {
        const [bookKey, chapterKey, filename] = parts;
        return {
            bookId: parseInt(bookKey.slice(1)), // b1 -> 1
            chapterId: parseInt(chapterKey.slice(1)), // c1 -> 1,
            paragraphId: undefined,
            filename,
        };
    }

    throw new Error(`${path} is not a paragraph path, nor an epigraph path`);
};

const toParagraph = (bookId: number, chapterId: number, paragraphId: number, filename: string, content: string): Paragraph => {
    return {
        id: paragraphId,
        key: `b${bookId}-c${chapterId}-p${paragraphId}`,
        text: {
            paraphrase: filename === 'paraphrase.html' ? content : '',
            paraphraseNotes: filename === 'paraphrase.notes.html' ? content : '',
            qBitSky: filename === 'qBitSky.html' ? content : '',
            qBitSkyNotes: filename === 'qBitSky.notes.html' ? content : '',
            ross: filename === 'ross.html' ? content : '',
            rossNotes: filename === 'ross.notes.html' ? content : '',
        }
    };
};

if (isInDocker) {
    git(`config --global user.email "snowinmars@yandex.ru"`);
    git(`config --global user.name "snowinmars"`);
    git(`remote set-url origin https://snowinmars:${gitKey}@github.com/snowinmars/aristotle.paraphrase.data`)
    git(`fetch origin`);
    git(`checkout -b author origin/author`, true);
    git('pull');
}
