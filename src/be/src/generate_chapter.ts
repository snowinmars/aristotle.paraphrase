import {join, resolve} from "path";
import {closeSync, existsSync, mkdirSync, openSync, utimesSync} from 'fs';


const touchFile = (path: string) => {
    const time = new Date();
    try {
        utimesSync(path, time, time);
    } catch (err) {
        closeSync(openSync(path, 'w'));
    }
};

const touchDirectory = (path: string): void => {
    if (!existsSync(path)){
        mkdirSync(path, { recursive: true });
    }
};

const root = resolve('./src/data/');

if (process.argv.length !== 5) {
    throw new Error('Too few arguments');
}

const [ bookId, chapterId, lastParagraphId ]: number[] = process.argv.slice(2).map(x => parseInt(x));

const bookKey = `b${bookId.toString().padStart(2, "0")}`;
const chapterKey = `c${chapterId.toString().padStart(2, "0")}`;

const filesInChapter = [
    'qBitSky.epigraph.html',
    'ross.epigraph.html',
];
const filesInParagraph = [
    'paraphrase.html',
    'paraphrase.notes.html',
    'qBitSky.html',
    'qBitSky.notes.html',
    'ross.html',
    'ross.notes.html',
];

const bookDirectory = join(root, bookKey);
touchDirectory(bookDirectory);

const chapterDirectory = join(bookDirectory, chapterKey);
touchDirectory(chapterDirectory);

console.log('  Building chapter in ', chapterDirectory);

filesInChapter.forEach(filename => {
    const path = join(chapterDirectory, filename);
    touchFile(path);
});

for (const paragraphId in [...Array(lastParagraphId).keys()]) {
    const stringParagraphId = (parseInt(paragraphId) + 1).toString().padStart(2, "0");
    const paragraphDirectory = join(chapterDirectory, `p${stringParagraphId}`);
    touchDirectory(paragraphDirectory);

    filesInParagraph.forEach(filename => {
        const path = join(paragraphDirectory, filename);
        touchFile(path);
    });
}
