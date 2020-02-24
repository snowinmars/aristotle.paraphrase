import React from 'react';
import './Chapter.scss';
import terms from '../Paraphrase/terms'
import Highlighter from "../Highlighter/Highlighter";

import { highlight_paragraph }  from './../../actions/index';
import { connect } from 'react-redux'

class Chapter extends React.PureComponent {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const to = nextProps.to.length && nextProps.to.find(x => x.destination === this.settings.destination);

        if (!to) {
            return nextProps.from.chapter === this.settings.chapter &&
                nextProps.from.book === this.settings.book;
        }

        const isInternalParagraph = nextProps.from.destination === this.settings.destination &&
            nextProps.from.chapter === this.settings.chapter &&
            nextProps.from.book === this.settings.book;

        const isExternalParagraph = to.destination === this.settings.destination &&
            to.chapter === this.settings.chapter &&
            to.book === this.settings.book;

        return isInternalParagraph || isExternalParagraph;
    }

    settings = {};

    parse_tags = (paragraph) => {
        let highlighted_paragraphs = [];
        let text = paragraph;

        if (paragraph.startsWith('[')) {
            const items = paragraph.split('\n');
            text = items.pop();

            items.map(tag => {
                if (!(tag.startsWith('[') && tag.endsWith(']'))) {
                    throw new Error(`Wrong tag format: ${tag}`);
                }

                const [name, value] = tag.slice(1).slice(0, -1).split(':');

                if (name !== 'ref') {
                    throw new Error(`Wrong tag name: ${name}`);
                }

                if (+value <= 0) {
                    throw new Error(`Wrong tag value: ${value}`);
                }

                let [paragraph_destination, paragraph_index] = value.split(' ');
                paragraph_index = Number(paragraph_index);

                highlighted_paragraphs.push({
                    destination: paragraph_destination,
                    chapter: this.settings.chapter,
                    book: this.settings.book,
                    index: paragraph_index
                });

                return 0;
            })
        }

        return {
            text, highlighted_paragraphs
        }
    };

    raise_paragraph_highlight = (highlighted_paragraphs, index) => {
        if (!highlighted_paragraphs) {
            this.props.set_hovered_paragraph({
                    from: {
                        chapter: this.settings.chapter,
                        book: this.settings.book
                    },
                    to:[]}
                    );
            return;
        }

        const settings = {
            from: {
                destination: this.settings.destination,
                chapter: this.settings.chapter,
                book: this.settings.book,
                index: index,
            },
            to: highlighted_paragraphs
        };

        this.props.set_hovered_paragraph(settings);
    };


    render_paragraph = (paragraph, index) => {
        const highlight = ({children}) => (
            <span className="highlighted-term">{children}</span>
        );

        const parsed = this.parse_tags(paragraph);

        const isInternalParagraph = this.props.from &&
            this.props.from.destination === this.settings.destination &&
            this.props.from.book === this.settings.book &&
            this.props.from.chapter === this.settings.chapter &&
            this.props.from.index === index;

        const to = this.props.to.length && this.props.to.find(x => x.destination === this.settings.destination && x.index === index);
        const isExternalParagraph = to &&
            to.destination === this.settings.destination &&
            to.book === this.settings.book &&
            to.chapter === this.settings.chapter &&
            to.index === index;

        let className = 'unhighlighted-paragraph';

        if (this.props.isAdditionalTextVisible && (isInternalParagraph || isExternalParagraph)) {
            className = 'highlighted-paragraph'
        }

        return (
            <p className={'paragraph'} key={`${this.props.chapter.id}_${index}`}>
                <Highlighter
                    searchWords={terms}
                    textToHighlight={parsed.text}
                    className={className}
                    autoEscape={true}
                    highlightTag={highlight}
                    dangerouslySetInnerHTML={true}
                    onMouseEnter={() => this.raise_paragraph_highlight(parsed.highlighted_paragraphs, index)}
                    onMouseLeave={() => this.raise_paragraph_highlight(null)}
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
        const chapter = this.props.chapter;
        this.parse_id(chapter.id);

        return (
            <div className={[this.props.className, 'chapter'].join(' ')} key={chapter.id} id={chapter.id}>
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

Chapter.whyDidYouRender = true;

const mapStateToProps = (state) => {
    return {
        from: state.from,
        to: state.to,
        isAdditionalTextVisible: state.isAdditionalTextVisible
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        set_hovered_paragraph: (settings) => {
            dispatch(highlight_paragraph(settings))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chapter);
