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

const [ bookIds, chapterIds, lastParagraphIds ]: number[][] = process.argv.slice(2).map(x => {
    if (x.includes(',')) {
        return x.split(',').map(y => parseInt(y));
    }

    if (x.includes('-')) {
        const [min, max] = x.split('-').map(x => parseInt(x));

        return new Array(max - min + 1).fill(0).map((d, i) => i + min - 1)
    }

    return [parseInt(x)]
});

const filesInBook = [
    'qBitSky.summary.html',
]
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

bookIds.forEach(bookId => {
    const bookKey = `b${bookId.toString().padStart(2, "0")}`;

    const bookDirectory = join(root, bookKey);
    console.log('  Building ', bookKey, ' book in ', bookDirectory);

    touchDirectory(bookDirectory);

    filesInBook.forEach(filename => {
        const path = join(bookDirectory, filename);
        touchFile(path);
    });

    chapterIds.forEach(chapterId => {
        const chapterKey = `c${chapterId.toString().padStart(2, "0")}`;
        const chapterDirectory = join(bookDirectory, chapterKey);
        touchDirectory(chapterDirectory);

        console.log('    Building ', chapterKey, ' chapter in ', chapterDirectory);

        filesInChapter.forEach(filename => {
            const path = join(chapterDirectory, filename);
            touchFile(path);
        });

        lastParagraphIds.forEach(lastParagraphId => {
            const stringParagraphId = (lastParagraphId + 1).toString().padStart(2, "0");
            const paragraphDirectory = join(chapterDirectory, `p${stringParagraphId}`);
            touchDirectory(paragraphDirectory);

            filesInParagraph.forEach(filename => {
                const path = join(paragraphDirectory, filename);
                touchFile(path);
            });
        })
    })
})
