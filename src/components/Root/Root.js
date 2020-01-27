import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Root.scss';
import Chapter from "../Chapter/Chapter";
import Origin_Books from '../Origin/Origin_book'
import Notes_books from '../Notes/Notes_book'
import Paraphrase_Books from '../Paraphrase/Paraphrase_book'
import Menu from "../Menu/Menu";
import About from "../About/About";
import Status from "../Status/Status";

class Root extends React.Component {
    render = () => {
        if (Origin_Books.books.length !== Notes_books.books.length ||
            Notes_books.books.length !== Paraphrase_Books.books.length ||
            Paraphrase_Books.books.length !== Origin_Books.books.length)
        {
            throw `books count does not match: origin - ${Origin_Books.books.length}, notes - ${Notes_books.books.length}, paraphrase - ${Paraphrase_Books.books.length}`;
        }

        const books = Origin_Books.books.map((book, book_index) => {
            const origin_book = Origin_Books.books[book_index];
            const notes_book = Notes_books.books[book_index];
            const paraphrase_book = Paraphrase_Books.books[book_index];
            const book_id = `${origin_book.id}_${notes_book.id}_${paraphrase_book.id}`;
            
            const chapters = book.chapters.map((_, chapter_index) => {
                const origin_chapter = origin_book.chapters[chapter_index];
                const notes_chapter = notes_book.chapters[chapter_index];
                const paraphrase_chapter = paraphrase_book.chapters[chapter_index];

                return <React.Fragment
                    key={`${book_id}_chapter${chapter_index}`}>
                    <div className={'chapters-list'}>
                        <Chapter item={origin_chapter}/>
                        <Chapter item={notes_chapter} className={'sticky'}/>
                        <Chapter item={paraphrase_chapter}/>
                    </div>
                </React.Fragment>;
            });
            
            return <React.Fragment key={book_id}>
                <div className={'chapters-list'}>
                    <span className={'book-title'}>{origin_book.title}</span>
                    <span className={'book-title'}>{notes_book.title}</span>
                    <span className={'book-title'}>{paraphrase_book.title}</span>
                </div>

                {chapters}
            </React.Fragment>;
        });
        
        return (
            <div className={'root'}>
                <Router>
                    <Menu />

                    <Switch>
                        <Route path={'/status'}>
                            <Status />
                        </Route>
                        
                        <Route path={'/books/b1'}>
                            {books[0]}
                        </Route>

                        <Route path={'/books'}>
                            Оглавление
                            <ul>
                                <li>
                                    <Link to={'/books/b1'}>Книга первая. Мудрость - наука о причинах</Link>
                                </li>
                            </ul>
                        </Route>

                        <Route path={'/'}>
                            <About />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    };
}

export default Root;

