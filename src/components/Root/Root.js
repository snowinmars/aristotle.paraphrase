import React from 'react';
import './Root.scss';
import Chapter from "../Chapter/Chapter";
import Origin_Book from '../Origin/Origin_book'
import Paraphrase_Book from '../Paraphrase/Paraphrase_book'
import Notes_book from '../Notes/Notes_book'

function Root() {
    if (Origin_Book.chapters.length !== Notes_book.chapters.length ||
        Notes_book.chapters.length !== Paraphrase_Book.chapters.length ||
        Paraphrase_Book.chapters.length !== Origin_Book.chapters.length)
    {
        throw `Chapters count does not match: origin - ${Origin_Book.chapters.length}, notes - ${Notes_book.chapters.length}, paraphrase - ${Paraphrase_Book.chapters.length}`;
    }

    const volumes = Origin_Book.chapters.map((_, i) => {
        return <React.Fragment key={`chapter_${i}`}>
            <div className={'chapters-list'}>
                <Chapter item={Origin_Book.chapters[i]} key={`${Origin_Book.id}_${Origin_Book.chapters[i].id}`} />
                <Chapter item={Notes_book.chapters[i]} className={'sticky'} key={`${Notes_book.id}_${Notes_book.chapters[i].id}`} />
                <Chapter item={Paraphrase_Book.chapters[i]} key={`${Paraphrase_Book.id}_${Paraphrase_Book.chapters[i].id}`} />
            </div>
        </React.Fragment>
    });

    return (
        <div className={'root'}>
            <div className={'chapters-list'}>
                <span className={'book-title'}>
                    {Origin_Book.title}
                </span>

                    <span className={'book-title'}>
                    {Notes_book.title}
                </span>

                    <span className={'book-title'}>
                    {Paraphrase_Book.title}
                </span>
            </div>

            {volumes}
        </div>
    );
}

export default Root;
