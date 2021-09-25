import React, {FunctionComponent} from 'react';
import styles from './GeneralBookView.module.scss';
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {useGetBookQuery} from "../accessor";
import Loader from "../Loader/Loader";

type MatchParameters = {
    bookId: string,
}

const GeneralBookView: FunctionComponent<RouteComponentProps<MatchParameters>> = (props): JSX.Element => {
    const bookId = parseInt(props.match.params.bookId);

    const {data: book, error, isLoading} = useGetBookQuery(bookId);

    if (error) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (book) {
        return (
            <ul className={styles.prfGeneralBook}>
                {
                    book.chapters.map(x => {
                        return <li key={x.key} className={styles.prfBookChapter}>
                            <div className={styles.prfBookChapterHeader}>
                                <NavLink to={`/books/${bookId}/${x.id}`}>Глава {x.id}</NavLink>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: `<div>${x.qBitSkyEpigraph}</div>`}}>
                            </div>
                        </li>;
                    })
                }
            </ul>
        );
    }

    return <div>Api error</div>;
};

export default withRouter(GeneralBookView);
