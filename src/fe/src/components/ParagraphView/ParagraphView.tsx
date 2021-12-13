import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from './ParagraphView.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Controls from './Controls/Controls';
import {ControlChange, ParagraphViewProperties} from './types';
import {MultiText, ParagraphHeader} from "../../types/types";
import Editor from "../Editor/Editor";

const getTextById = (text: MultiText, textId: ParagraphHeader): string => {
  switch (textId) {
    case ParagraphHeader.paraphrase: return text.paraphrase;
    case ParagraphHeader.qBitSky: return text.qBitSky;
    case ParagraphHeader.ross: return text.ross;
    default: throw new Error(`Enum ParagraphHeader is out of range: ${textId}`);
  }
};

const scrollToCurrentAnchor= (): void => {
  let location = window.location.href;
  const hasAnchor = location.includes("#");
  if (hasAnchor) {
    const id = `${location.substring(location.indexOf("#") + 1)}`;
    const anchor = document.getElementById(id);
    if (anchor) {
      anchor.scrollIntoView({behavior: "smooth"});
    }
  }
}

const getNotesById = (text: MultiText, textId: ParagraphHeader): string => {
  switch (textId) {
    case ParagraphHeader.paraphraseNotes: return text.paraphraseNotes;
    case ParagraphHeader.qBitSkyNotes: return text.qBitSkyNotes;
    case ParagraphHeader.rossNotes: return text.rossNotes;
    default: throw new Error(`Enum ParagraphHeader is out of range: ${textId}`);
  }
};

const ParagraphView: FunctionComponent<ParagraphViewProperties> = ({bookId, chapterId, paragraph}) => {
  const [leftTextId, setLeftTextId] = useState(ParagraphHeader.qBitSky);
  const [rightTextId, setRightTextId] = useState(ParagraphHeader.paraphrase);
  const [notesTextId, setNotesTextId] = useState(ParagraphHeader.paraphraseNotes);

  const leftText = getTextById(paragraph.text, leftTextId);
  const rightText = getTextById(paragraph.text, rightTextId);
  const notesText = getNotesById(paragraph.text, notesTextId);

  useEffect(() => scrollToCurrentAnchor(), []);

  const updateText = (change: ControlChange) => {
    switch (change.blockType) {
      case 'left':
        setLeftTextId(change.paragraphHeaderId);
        break;
      case 'right':
        setRightTextId(change.paragraphHeaderId);
        break;
      case 'notes':
        setNotesTextId(change.paragraphHeaderId);
        break;
      default:
        throw new Error(`${change.blockType} is out of range`);
    }
  };

  return (
      <Container fluid className={styles.prfParagraph}>
        <a id={`${paragraph.id}`} href={`#${paragraph.id}`}> </a>
        <Row>
          <Col xs={12} lg={6}>
            <Controls
                blockType={'left'}
                paragraphKey={paragraph.key}
                selectedTextId={leftTextId}
                parentChangeCallback={updateText}
            />
            <sup className={styles.prfParagraphIndex}>
              {paragraph.id}
            </sup>
            <Editor
                bookId={bookId}
                chapterId={chapterId}
                paragraphId={paragraph.id}
                header={leftTextId}
                text={leftText}
            >
            </Editor>
          </Col>
          <Col className="d-none d-lg-block" lg={6}>
            <Controls
                blockType={'right'}
                paragraphKey={paragraph.key}
                selectedTextId={rightTextId}
                parentChangeCallback={(x) => updateText(x)}
            />
            <sup className={styles.prfParagraphIndex}>
              {paragraph.id}
            </sup>
            <Editor
                bookId={bookId}
                chapterId={chapterId}
                paragraphId={paragraph.id}
                header={rightTextId}
                text={rightText}
            >
            </Editor>
          </Col>
        </Row>
        {
          (paragraph.text.paraphraseNotes || paragraph.text.qBitSkyNotes || paragraph.text.rossNotes) && (<Row>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Примечания</Accordion.Header>
                  <Accordion.Body>
                    <Controls
                      blockType={'notes'}
                      paragraphKey={paragraph.key}
                      selectedTextId={notesTextId}
                      parentChangeCallback={(x) => updateText(x)}
                    />
                    <sup className={styles.prfParagraphIndex}>
                      {paragraph.id}
                    </sup>
                    <Editor
                      bookId={bookId}
                      chapterId={chapterId}
                      paragraphId={paragraph.id}
                      header={notesTextId}
                      text={notesText}
                    >
                    </Editor>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          )
        }
      </Container>
  );
};

export default ParagraphView;
