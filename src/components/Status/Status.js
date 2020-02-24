import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './Status.scss';
import git_commit_hash from './git_commit_hash'
import Origin_Books from '../Origin/Origin_book'
import Paraphrase_Books from '../Paraphrase/Paraphrase_book'

class Status extends React.Component {
    componentDidMount() {
        const uri = 'https://api.github.com/repos/snowinmars/aristotel.paraphrase/branches/master';

        fetch(uri)
            .then(res => res.json())
            .then(result => this.setState({git_info: result}),
                error => console.log(error));
    }

    constructor(props) {
        super(props);

        this.state = {
            git_info: null
        }
    }

    get_last_change_block = () => {
        const git_info = this.state.git_info;

        if (!git_info) {
            return <React.Fragment>Loading...</React.Fragment>;
        }

        const datetime_format = {
            day: '2-digit',
            year: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const now = Date.now();

        const last_commit_datetime = new Date(Date.parse(git_info.commit.commit.author.date));
        const diff = Math.round((now - last_commit_datetime.getTime()) / (24 * 3600 * 1000));

        const last_commit_uri = git_info.commit.html_url;

        const last_commit_datetime_string = last_commit_datetime.toLocaleDateString("ru-RU", datetime_format);

        const ago = <React.Fragment>
            {diff === 0 ? '(сегодня)' : `(дней назад: ${diff})`}
        </React.Fragment>;

        return (
            <React.Fragment>
                <a href={last_commit_uri}>{last_commit_datetime_string}</a> {ago}
            </React.Fragment>
        );
    };

    get_statistics_block = () => {
        const stats = this.calc();



        return this.render_table(stats);
    };

    calc = () => {
        const output = {
            origin: {
                paragraphs: {
                    count: 0,
                    length: 0,
                },
                sentences: {
                    count: 0,
                    length: 0,
                },
            },
            paraphrase: {
                paragraphs: {
                    count: 0,
                    length: 0,
                },
                sentences: {
                    count: 0,
                    length: 0,
                },
            }
        };

        // returns below exists only for making eslint happy

        Origin_Books.books.map((book, book_index) => {
            const origin_book = Origin_Books.books[book_index];
            const paraphrase_book = Paraphrase_Books.books[book_index];

            return book.chapters.map((_, chapter_index) => {
                const origin_chapter = origin_book.chapters[chapter_index];
                const paraphrase_chapter = paraphrase_book.chapters[chapter_index];

                origin_chapter.origin_paragraphs.map(paragraph => {
                    output.origin.paragraphs.length += paragraph.length;
                    output.origin.paragraphs.count++;

                    return paragraph.split('.').map(sentence => {
                        output.origin.sentences.length += paragraph.length;
                        output.origin.sentences.count++;

                        return 0;
                    });
                });

                return paraphrase_chapter.origin_paragraphs.map(paragraph => {
                    output.paraphrase.paragraphs.length += paragraph.length;
                    output.paraphrase.paragraphs.count++;

                    return paragraph.split('.').map(sentence => {
                        output.paraphrase.sentences.length += paragraph.length;
                        output.paraphrase.sentences.count++;

                        return 0;
                    });
                });
            });
        });

        return output;
    };

    render_table = (stats) =>
    {
        const average_origin_sentences_length = Math.round(stats.origin.sentences.length / stats.origin.sentences.count);
        const average_paraphrase_sentences_length = Math.round(stats.paraphrase.sentences.length / stats.paraphrase.sentences.count);
        const average_origin_paragraph_length = Math.round(stats.origin.paragraphs.length / stats.origin.paragraphs.count);
        const average_paraphrase_paragraph_length = Math.round(stats.paraphrase.paragraphs.length / stats.paraphrase.paragraphs.count);

        return <React.Fragment>
            <Table className={'status-statistics-table'}>
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell>Оригинал</TableCell>
                        <TableCell>Парафраз</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key='avg_paragraphs_count'>
                        <TableCell>Количество абзацев</TableCell>
                        <TableCell>{stats.origin.paragraphs.count}</TableCell>
                        <TableCell>{stats.paraphrase.paragraphs.count} ({Math.round(stats.paraphrase.paragraphs.count * 100 / stats.origin.paragraphs.count)} %)</TableCell>
                    </TableRow>
                    <TableRow key='avg_paragraphs_length'>
                        <TableCell>Средняя длина абзацев</TableCell>
                        <TableCell>{average_origin_paragraph_length}</TableCell>
                        <TableCell>{average_paraphrase_paragraph_length} ({Math.round(average_paraphrase_paragraph_length * 100 / average_origin_paragraph_length)} %)</TableCell>
                    </TableRow>
                    <TableRow key='avg_sentences_length'>
                        <TableCell>Количество предложений</TableCell>
                        <TableCell>{stats.origin.sentences.count}</TableCell>
                        <TableCell>{stats.paraphrase.sentences.count} ({Math.round(stats.paraphrase.sentences.count * 100 / stats.origin.sentences.count)} %)</TableCell>
                    </TableRow>
                    <TableRow key='avg_sentences_length'>
                        <TableCell>Средняя длина предложений</TableCell>
                        <TableCell>{average_origin_sentences_length}</TableCell>
                        <TableCell>{average_paraphrase_sentences_length} ({Math.round(average_paraphrase_sentences_length * 100 / average_origin_sentences_length)} %)</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>;
    };

    render = () => {
        const last_change_block = this.get_last_change_block();
        const statistics_block = this.get_statistics_block();

        return (
          <div className={'status'}>
              <p>Переведено: 1/14 книг</p>
              <p>Последнее изменение: {last_change_block}</p>
              <p>Коммит: {git_commit_hash}</p>
              {statistics_block}
          </div>
        );
    }
}

export default Status;
