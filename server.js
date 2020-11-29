const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5002;
const os = require("os");
const fs = require('fs');

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.send('aristotle api host');
});

app.get('/api/:bookId/:type/:extension', async (req, res) => {
    const bookId = req.params.bookId;
    const type = req.params.type;
    const extension = req.params.extension;

    if (!/\d+/.test(bookId)) return await res.json(`Wrong book id: ${bookId}`);

    let path = null;

    switch (type) {
        case 'origin_rus':
        case 'origin_rus_notes':
        case 'origin_eng':
        case 'origin_eng_notes':
        case 'paraphrase':
        case 'paraphrase_notes':
        case 'core':
            path = `./src/latex/${type}/b${bookId}/b${bookId}`;
            break;
        default:
            return await res.json(`Type is out of range: ${type}`);
    }

    switch (extension) {
        case 'pdf': {
            path += '.pdf';

            const file = fs.createReadStream(path);
            const stat = fs.statSync(path);
            res.set('Content-Length', stat.size);
            res.set('Content-Type', 'application/pdf');
            res.set('Content-Disposition', `attachment; filename=${type}/b${bookId}/b${bookId}.pdf`);
            file.pipe(res);

            break;
        }
        case 'tex': {
            path += '.tex';

            const file = fs.createReadStream(path);
            const stat = fs.statSync(path);
            res.set('Content-Length', stat.size);
            res.set('Content-Type', 'application/x-tex');
            res.set('Content-Disposition', `attachment; filename=${type}/b${bookId}/b${bookId}.tex`);
            file.pipe(res);

            break;
        }
        default:
            return await res.json(`Extension is out of range: ${extension}`);
    }



    return res;
});

app.listen(port, () => console.log(`Listening on ${os.hostname()}:${port}`));
