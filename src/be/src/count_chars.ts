import {resolve, join} from "path";
import {promises} from 'fs';
const { readdir, readFile } = promises;

const getFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, {withFileTypes: true});

  const files = await Promise.all(
    entries.map((entry) => {
      const res = resolve(dir, entry.name);
      return entry.isDirectory() ? getFiles(res) : res;
    })
  );

  return files.flat().filter(x => x);
};

const root = resolve('./src/data/');

const main = async (): Promise<void> => {
  const allFiles = (await getFiles(root)).map(x => x.slice(root.length))
  const qBitSkyFiles = allFiles.filter(x => x.includes('qBitSky'))
  const paraphraseFiles = allFiles.filter(x => x.includes('paraphrase'))
  const rossFiles = allFiles.filter(x => x.includes('ross'))

  console.log('Кубицкий: ', await count(qBitSkyFiles));
  console.log('Парафраз: ', await count(paraphraseFiles));
  console.log('Ross: ', await count(rossFiles));
}

const count = async (files: string[]): Promise<number> => {
  const counts = await Promise.all(files.map(x => countChars(x)))
  return counts.reduce((a, b) => a + b, 0)
}

const countChars = async (path: string): Promise<number> => {
  const data = await readFile(join(root, path), { encoding: "utf-8" });

  return [...data].reduce((acc, char) => {
    if (isInteresting(char)) {
      acc++;
    }

    return acc;
  }, 0)
}

const letterRegex = RegExp(/^\p{L}/,'u');

const isInteresting = (char: string): boolean => {
  return letterRegex.test(char)
}

(async () => await main())()
