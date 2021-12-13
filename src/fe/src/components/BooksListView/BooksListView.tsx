import React, {FunctionComponent} from 'react';
import styles from './BooksListView.module.scss';
import {NavLink, withRouter} from "react-router-dom";
import {useGetBooksQuery} from "../accessor";
import Loader from "../Loader/Loader";

const BooksListView: FunctionComponent = (): JSX.Element => {
    const {data: books, error, isLoading} = useGetBooksQuery();

    if (error) {
        return <div>Ошибка сервера - пожалуйста, <NavLink to={'/contacts'}>сообщите</NavLink> о ней</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (books) {
        return <div className={styles.prfBookList}>
            <h3>Метафизика</h3>
            <ol>
                {
                    books.map(book => {
                        return <li key={book.key} className={styles.prfBookListItem}>
                            <div>
                                <NavLink to={`/books/${book.id}/1`}>Читать</NavLink>
                                <NavLink to={`/books/${book.id}`}>Краткое изложение</NavLink>
                            </div>

                            <p>
                                {book.summary}
                            </p>
                        </li>;
                    })
                }
            </ol>
        </div>;
    }

    return <div>Api error</div>;
};

export default withRouter(BooksListView);
