import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import os from 'os';
import fs from 'fs';
import * as config from "./config";

fs.access(config.default.latexDir, (err) => {
  if (err) throw new Error(`latex dir ${config.default.latexDir} not found\n    ${err}`);
  if (!err) console.log(`Using ${config.default.latexDir} latex directory`)
})

const app = express();
const port = process.env.PORT || 5002;

// m$ can't write enums
enum types {
  origin_rus = 'origin_rus',
  origin_eng = 'origin_eng',
  paraphrase = 'paraphrase',
}

// m$ can't write enums
enum extensions {
  pdf = 'pdf',
  tex = 'tex',
}

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
  res.send('aristotle api host');
});

app.get('/api/:bookId/:type/:extension', (req, res) => {
  const bookIdString = req.params.bookId;
  const bookId = parseInt(bookIdString);
  const typeString = req.params['type'];
  // @ts-ignore hello m$ allo
  const type = types[typeString] as string;
  const extensionString = req.params['extension'];
  // @ts-ignore i hate u
  const extension = extensions[extensionString] as string;

  let path = `${config.default.latexDir}/${type}/b${bookId}/b${bookId}`;

  switch (extension) {
    case extensions.pdf: {
      path += '.pdf';

      const file = fs.createReadStream(path);
      const stat = fs.statSync(path);
      res.set('Content-Length', stat.size.toString());
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', `attachment; filename=${type}/b${bookId}/b${bookId}.pdf`);
      file.pipe(res);

      break;
    }
    case extensions.tex: {
      path += '.tex';

      const file = fs.createReadStream(path);
      const stat = fs.statSync(path);
      res.set('Content-Length', stat.size.toString());
      res.set('Content-Type', 'application/x-tex');
      res.set('Content-Disposition', `attachment; filename=${type}/b${bookId}/b${bookId}.tex`);
      file.pipe(res);

      break;
    }
  }

  return res;
});

app.listen(port, () => console.log(`Listening on ${os.hostname()}:${port}`));
