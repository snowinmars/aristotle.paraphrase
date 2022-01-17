import {join, resolve} from "path";
import {promises, readFile, writeFile} from "fs";

async function walk(directory: string): Promise<string[]> {
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

const root = resolve('./src/data/');
const files = await walk(root);

files.map(filepath => {
    readFile(filepath, 'utf8', (err, content) => {
        if (err) {
            throw err;
        }

        // [^\u0000-\u007F]|\w - any unicode letter
        const result = content
          .replaceAll(/ +--- +/g, ' - ') // это --- я > это - я
          .replaceAll(/ +-- +/g, ' - ') // это -- я > это - я
          .replaceAll(' - ', ' — ') // это - я > это — я
          .replaceAll('-', '—') // что-нибудь > что—нибудь
          .replaceAll(/  +/g, ' ')
          .replaceAll(/ +\./g, '.')
          .replaceAll(/ +,/g, ',')
          .replaceAll(/ +!/g, '!')
          .replaceAll(/ +\?/g, '?')
          .replaceAll(/ +:/g, ':')
          .replaceAll(/ +;/g, ';')
          .replaceAll(/([ >])"([^\u0000-\u007F]|\w)/g, '$1«$2')
          .replaceAll(/([ >])'([^\u0000-\u007F]|\w)/g, '$1«$2')
          .replaceAll(/([^\u0000-\u007F]|\w)"([.,;:!?) ])/g, '$1»$2')
          .replaceAll(/([^\u0000-\u007F]|\w)'([.,;:!?) ])/g, '$1»$2')
          .replaceAll(/\n\n\n/g, '\n\n<br />\n\n');

        writeFile(filepath, result, 'utf8', err => {
            if (err) {
                throw err;
            }
        });
    });
});
