import React, {FunctionComponent} from 'react';
import './BooksListView.scss';
import {NavLink, withRouter} from "react-router-dom";
import {useGetBooksQuery} from "../accessor";
import Loader from "../Loader/Loader";

const BooksListView: FunctionComponent = (): JSX.Element => {
    const {data: books, error, isLoading} = useGetBooksQuery();

    if (error) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (books) {
        return <div className={'prf-book-list'}>
            <h3>Метафизика</h3>
            <ol>
                {
                    books.map(book => {
                        return <li key={book.key} className={'prf-book-list-item'}>
                            <NavLink to={`/books/${book.id}/1`}>Книга {book.id}</NavLink>
                            <NavLink to={`/books/${book.id}`}>Краткое изложение</NavLink>
                        </li>;
                    })
                }
            </ol>
        </div>;
    }

    return <div>Api error</div>;
};

export default withRouter(BooksListView);
