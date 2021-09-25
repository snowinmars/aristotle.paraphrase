import styles from './ChapterView.module.scss';
import React, {FunctionComponent} from "react";
import ParagraphView from "../ParagraphView/ParagraphView";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {useGetBookQuery, useGetChapterQuery} from '../accessor';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ArrowBarLeft, ArrowBarRight, Book as BookIcon} from "react-bootstrap-icons";
import Loader from "../Loader/Loader";


type MatchParameters = {
  bookId: string,
  chapterId: string,
}

const buildEpigraph = (title: string, value: string) => {
  return (
    <div>
      <div className={styles.prfEpigraphTitle}>
        <span className={styles.prfEpigraphTitleMark}><BookIcon /></span>
        <span>{title}</span>
      </div>
      <div dangerouslySetInnerHTML={{__html: value}} className={styles.prfEpigraphValue}>
      </div>
    </div>
  );
};

const ChapterView: FunctionComponent<RouteComponentProps<MatchParameters>> = (props) => {
  const bookId = parseInt(props.match.params.bookId);
  const chapterId = parseInt(props.match.params.chapterId);

  const {data: book, error: bookError, isLoading: isBookLoading} = useGetBookQuery(bookId);
  const {data: chapter, error: chapterError, isLoading: isChapterLoading} = useGetChapterQuery({bookId, chapterId});

  if (bookError || chapterError) {
    return <div>Error</div>;
  }

  if (isBookLoading || isChapterLoading) {
    return <Loader />;
  }

  if (chapter && book) {
    return <div className={styles.prfChapterView}>
      <Container fluid>
        <Row>
          {
            chapter.id > 1 ?
                <Col xs={1} className={styles.prfChapterLinks}>
                  <NavLink to={`/books/${bookId}/${chapter.id - 1}`}><ArrowBarLeft size={24} /></NavLink>
                </Col> :
                <Col xs={1}> </Col>
          }
          <Col xs={10} lg={5}>
            {
              buildEpigraph('Парафраз Кубицкого А.В.', chapter.qBitSkyEpigraph)
            }
          </Col>
          <Col className="d-none d-lg-block" lg={5}>{chapter.rossEpigraph}</Col>
          {
            chapter.id < book.chapters.length ?
                <Col xs={1} className={styles.prfChapterLinks}>
                  <NavLink to={`/books/${bookId}/${chapter.id + 1}`}><ArrowBarRight size={24} /></NavLink>
                </Col> :
                <Col xs={1}> </Col>
          }
        </Row>

        <Row>
          <Col>
            <h2 className={styles.prfChapterTitle}>Глава {chapter.id}</h2>
          </Col>
        </Row>
      </Container>

      {
        chapter.paragraphs.map((paragraph) => {
          return (
              <ParagraphView
                  bookId={book.id}
                  key={paragraph.key}
                  chapterId={chapter.id}
                  headers={book.headers}
                  paragraph={paragraph}
              />
          );
        })
      }
    </div>;
  }

  return <div>Api error</div>;
};

export default withRouter(ChapterView);
