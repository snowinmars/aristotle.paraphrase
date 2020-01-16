import React from 'react';
import './Chapter.scss';
import terms from '../Paraphrase/terms'
import Highlighter from "../Highlighter/Highlighter";

class Chapter extends React.Component {
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
    
    render = () => {
        const chapter = this.props.item;
        
        return (
            <div className={'chapter'} key={chapter.id}>
                <div className={'chapter-title'}>
                    {chapter.title}
                </div>
                <div className={'paragraphs-list'}>
                    {chapter.origin_paragraphs.map(((paragraph, i) => this.render_paragraph(paragraph, `${chapter.id}_${i}`)))}
                </div>
            </div>
        );
    }
}

export default Chapter;