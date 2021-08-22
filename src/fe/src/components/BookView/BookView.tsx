import './BookView.scss';
import React, { FunctionComponent } from 'react';
import { BookViewProperties } from './types';

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
