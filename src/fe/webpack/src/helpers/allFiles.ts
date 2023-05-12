import { join, resolve } from 'path';

import glob from 'glob';

// path is like './src'
export const allTypescriptFiles = (path: string): Record<string, string> => glob.sync(resolve(join(path, '/**/*[!.d].{tsx,ts}'))).reduce<Record<string, string>>((acc, file) => {
  acc[file
    .replace(new RegExp(`.*${path}/`), '')
    .replace(/\.tsx$/, '')
    .replace(/\.ts$/, '')
  ] = file;
  return acc;
}, {});

export const allStyleFiles = (path: string): Record<string, string> => glob.sync(resolve(join(path, '/**/*.{scss,css}'))).reduce<Record<string, string>>((acc, file) => {
  acc[file
    .replace(new RegExp(`.*${path}/`), '')
    .replace(/\.scss$/, '')
    .replace(/\.css$/, '')
  ] = file;
  return acc;
}, {});
