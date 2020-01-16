import React from 'react';
import './Volume.scss';
import terms from '../Paraphrase/terms'
import Highlighter from "../Highlighter/Highlighter";

class Volume extends React.Component {
    render_paragraph = (paragraph, key) => {
        const highlight = ({ children, highlightIndex }) => (
            <span className="highlighted-term">{children}</span>
        );

        return (
            <p className={'paragraph'} key={key}>
                <Highlighter
                    searchWords={terms}
                    textToHighlight={paragraph}
                    autoEscape={true}
                    highlightTag={highlight}
                    dangerouslySetInnerHTML={true}
                />
            </p>
        );
    };
    
    render_chapter = (chapter, key_prefix) => {
        return (
            <div className={'chapter'} key={key_prefix + "_" + chapter.id}>
                <div className={'chapter-title'}>
                    {chapter.title}
                </div>
                <div className={'paragraphs-list'}>
                    {chapter.origin_paragraphs.map(((paragraph, i) => this.render_paragraph(paragraph, key_prefix + "_" + chapter.id + "_" + i)))}
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
                    {book.chapters.map(chapter => this.render_chapter(chapter, book.id))}
                </div>
            </div>
        )
    };
    
    render = () => {
        return (
          <div className={'volume'}>
              <div className={'books'}>
                  {this.props.items.map(this.render_book)}
              </div>
          </div>  
        );
    }
}

export default Volume;