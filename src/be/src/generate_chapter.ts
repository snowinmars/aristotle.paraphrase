import {join, resolve} from "path";
import {promises} from 'fs'
const {access, mkdir, open, utimes} = promises

const touchFile = async (path: string): Promise<void> => {
    const time = new Date();
    try {
        await utimes(path, time, time);
    } catch (err) {
        const handle = await open(path, 'w');
        await handle.close();
    }
};

const touchDirectory = async (path: string): Promise<void> => {
    await access(path)
      .catch(async () => await mkdir(path, { recursive: true }))
};

const root = resolve('./src/data/');
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

const main = async () => {

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

    await Promise.all(bookIds.map(async bookId => {
        await buildBook(bookId, chapterIds, lastParagraphIds);
    }))
}

const buildBook = async (bookId: number, chapterIds: number[], lastParagraphIds: number[]): Promise<void> => {
    const bookKey = `b${bookId.toString().padStart(2, "0")}`;

    const bookDirectory = join(root, bookKey);
    console.log('  Building ', bookKey, ' book in ', bookDirectory);

    await touchDirectory(bookDirectory);

    await Promise.all(
      filesInBook.map(async filename => {
          const path = join(bookDirectory, filename);
          await touchFile(path);
      })
    );

    await Promise.all(chapterIds.map(async chapterId => {
        await buildChapter(bookDirectory, chapterId, lastParagraphIds);
    }))
}

const buildChapter = async (bookDirectory: string, chapterId: number, lastParagraphIds: number[]): Promise<void> => {
    const chapterKey = `c${chapterId.toString().padStart(2, "0")}`;
    const chapterDirectory = join(bookDirectory, chapterKey);
    await touchDirectory(chapterDirectory);

    console.log('    Building ', chapterKey, ' chapter in ', chapterDirectory);

    await Promise.all(filesInChapter.map(async filename => {
        const path = join(chapterDirectory, filename);
        await touchFile(path);
    }));

    await Promise.all(lastParagraphIds.map(async lastParagraphId => {
        await buildParagraph(chapterDirectory, lastParagraphId);
    }))
}

const buildParagraph = async (chapterDirectory: string, lastParagraphId: number): Promise<void> => {
    const stringParagraphId = (lastParagraphId + 1).toString().padStart(2, "0");
    const paragraphDirectory = join(chapterDirectory, `p${stringParagraphId}`);
    await touchDirectory(paragraphDirectory);

    await Promise.all(filesInParagraph.map(async filename => {
        const path = join(paragraphDirectory, filename);
        await touchFile(path);
    }));
}

(async () => await main())();
