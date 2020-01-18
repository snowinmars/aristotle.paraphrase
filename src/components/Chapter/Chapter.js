import React from 'react';
import './Chapter.scss';
import terms from '../Paraphrase/terms'
import Highlighter from "../Highlighter/Highlighter";

import { highlight_paragraph }  from './../../actions/index';
import { connect } from 'react-redux'

class Chapter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered_paragraph: null,
            destination: null,
            book: null,
            chapter: null
        }
    }
    
    settings = {
        
    };
    
    highlightasd = (text, terms_to_replace, tag) => {
        if (!tag) {
            tag = (t) => `<span class='highlight'>${t}</span>`
        }

        const reactStringReplace = require('react-string-replace');

        terms_to_replace.map(term => {
            const regex = new RegExp(term,"g");
            text = reactStringReplace(text, regex, tag(term))
        });
        
        return text;
    };
    
    render_paragraph = (paragraph, index) => {
        const highlight = ({children}) => (
            <span className="highlighted-term">{children}</span>
        );
        
        let tags = null;
        let hovered_paragraph = null;
        let text = paragraph;
        
        if (paragraph.startsWith('[')) {
            const items = paragraph.split('\n');
            text = items.pop();
            tags = items;

            tags.map(tag => {
                if (!(tag.startsWith('[') && tag.endsWith(']'))) {
                    throw `Wrong tag format: ${tag}`;
                }
                
                const [name, value] = tag.slice(1).slice(0, -1).split(':');

                if (name !== 'ref') {
                    throw `Wrong tag name: ${name}`;
                }
                
                if (+value <= 0) {
                    throw `Wrong tag value: ${value}`
                }

                hovered_paragraph = value;
            })
        }

        const raise_paragraph_highlight = (tags) => {
            if (!tags || tags.length  === 0) {
                this.props.set_hovered_paragraph(null);
                return;
            }
            
            this.props.set_hovered_paragraph(hovered_paragraph);
        };
        
        let className = 'unhighlighted-paragraph';
        
        if (this.props.hovered_paragraph) {
            const [destination, paragraph] = this.props.hovered_paragraph.split(' ');
            
            const chapter = this.props.item;
            if (destination === 'origin' && chapter.id.startsWith('origin') && index === Number(paragraph)) {
                className = 'highlighted-paragraph'
            }
        }
        
        return (
            <p className={'paragraph'} key={`${this.props.item.id}_${index}`}>
                <Highlighter
                    searchWords={terms}
                    textToHighlight={text}
                    className={className}
                    autoEscape={true}
                    highlightTag={highlight}
                    dangerouslySetInnerHTML={true}
                    onMouseEnter={() => raise_paragraph_highlight(tags)}
                    onMouseLeave={() => raise_paragraph_highlight(null)}
                />
            </p>
        );
    };

    parse_id = (id) => {
        const [destination, raw_book, raw_chapter] = id.split('_');
        const book = raw_book.slice(1);
        const chapter = raw_chapter.slice(1);
        
        this.settings.destination = destination;
        this.settings.book = book;
        this.settings.chapter = chapter;
    };
    
    render = () => {
        const chapter = this.props.item;
        this.parse_id(chapter.id);
        
        return (
            <div className={'chapter'} key={chapter.id}>
                <div className={'chapter-title'}>
                    {chapter.title}
                </div>
                <div className={'paragraphs-list'}>
                    {chapter.origin_paragraphs.map(((paragraph, i) => this.render_paragraph(paragraph, i)))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(`mapStateToProps: ${state.hovered_paragraph}`)
    
    return {
        hovered_paragraph: state.hovered_paragraph,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        set_hovered_paragraph: (paragraph) => {
            dispatch(highlight_paragraph(paragraph))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);