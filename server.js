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

app.get('/api/:bookId/:chapterId/:type/pdf', async (req, res) => {
    const bookId = req.params.bookId;
    const chapterId = req.params.chapterId;
    const type = req.params.type;

    if (!/\d+/.test(bookId)) return await res.json(`Wrong book id: ${bookId}`);
    if (!/\d+/.test(chapterId)) return await res.json(`Wrong book id: ${bookId}`);

    let path = null;

    switch (type) {
        case 'origin_rus':
        case 'origin_rus_notes':
        case 'origin_eng':
        case 'origin_eng_notes':
        case 'paraphrase':
        case 'paraphrase_notes':
        case 'core':
            path = `./src/latex/${type}/b${bookId}/c${chapterId}.pdf`;
            break;
        default:
            return await res.json(`Type is out of range: ${type}`);
    }

    const file = fs.createReadStream(path);
    const stat = fs.statSync(path);
    res.set('Content-Length', stat.size);
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);

    return res;
});

app.get('/api/:bookId/:chapterId/:type', async (req, res) => {
    const bookId = req.params.bookId;
    const chapterId = req.params.chapterId;
    const type = req.params.type;

    if (!/\d+/.test(bookId)) return await res.json(`Wrong book id: ${bookId}`);
    if (!/\d+/.test(chapterId)) return await res.json(`Wrong book id: ${bookId}`);

    let path = null;

    switch (type) {
        case 'origin_rus':
        case 'origin_rus_notes':
        case 'origin_eng':
        case 'origin_eng_notes':
        case 'paraphrase':
        case 'paraphrase_notes':
        case 'core':
            path = `./src/latex/${type}/b${bookId}/c${chapterId}.tex`;
            break;
        default:
            return await res.json(`Type is out of range: ${type}`);
    }

    return fs.readFile(path, 'utf8', (error, content) => {
        if (error) {
            return res.json(error);
        }

        return res.json(content);
    });
});

app.listen(port, () => console.log(`Listening on ${os.hostname()}:${port}`));
