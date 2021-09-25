import styles from './BookView.module.scss';
import React, { FunctionComponent } from 'react';
import { Book } from '../../types/types';

type BookViewProperties = {
  book: Book
}

const BookView: FunctionComponent<BookViewProperties> = ({ book }) => {
  return (<ol>
    {
      book.chapters.map((chapter) => {
        return (
          <li key={chapter.key}>
            <a href={`/books/${book.id}/${chapter.id}`}>Глава {chapter.id}</a>
          </li>
        );
      })
    }
  </ol>);
};

export default BookView;
