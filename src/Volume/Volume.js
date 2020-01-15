import React from 'react';
import './Volume.css';

class Volume extends React.Component {
    render_paragraph = (paragraph) => {
        return (
            <p className={'paragraph'}>{paragraph}</p>
        );
    };
    
    render_chapter = (chapter) => {
        console.log('p', chapter.origin_paragraphs);
        
        return (
            <div className={'chapter'} key={chapter.id}>
                <div className={'chapter-title'}>
                    {chapter.title}
                </div>
                <div className={'paragraphs-list'}>
                    {chapter.origin_paragraphs.map(this.render_paragraph)}
                </div>
            </div>
        );
    };
    
    render_book = (book) => {
        return (
            <div className={'book'} key={book.id}>
                <span className={'book-title'}>
                    {book.title}
                </span>
                <div className={'chapters-list'}>
                    {book.chapters.map(this.render_chapter)}
                </div>
            </div>
        )
    };
    
    render = () => {
        return (
          <div className={'origin'}>
              <div className={'books'}>
                  {this.props.items.map(this.render_book)}
              </div>
          </div>  
        );
    }
}

export default Volume;