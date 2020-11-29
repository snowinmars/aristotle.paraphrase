import React, {useState} from 'react';
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import config from '../../configs/api';
import Button from '@material-ui/core/Button';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import {types} from '../../types/types';
import './Book.scoped.scss';
import './Colors.scoped.scss';

import 'react-tabs/style/react-tabs.css';

const onDocumentLoadSuccess = (pageCount: number,
  url: string,
  type: types,
  setTotalOriginRusPage: (n: number) => void,
  setTotalOriginEngPage: (n: number) => void,
  setTotalParaphrasePage: (n: number) => void) => {
  switch (type) {
  case types.origin_rus:
    setTotalOriginRusPage(pageCount);
    break;
  case types.origin_eng:
    setTotalOriginEngPage(pageCount);
    break;
  case types.paraphrase:
    setTotalParaphrasePage(pageCount);
    break;
  default:
    throw new Error(`wrong type ${type}`);
  }
};

const renderTypeBlock = (url: string, type: types) => {
  let page = null;
  let control = null;

  const [currentOriginRusPage, setCurrentOriginRusPage] = useState(1);
  const [currentOriginEngPage, setCurrentOriginEngPage] = useState(1);
  const [currentParaphrasePage, setCurrentParaphrasePage] = useState(1);
  const [totalOriginRusPage, setTotalOriginRusPage] = useState(1);
  const [totalOriginEngPage, setTotalOriginEngPage] = useState(1);
  const [totalParaphrasePage, setTotalParaphrasePage] = useState(1);

  switch (type) {
  case types.origin_rus:
    page = <Page
      pageNumber={currentOriginRusPage}
      loading={'Загружается'}
      renderAnnotationLayer={false}
    />;
    control = <div className={'ariph-controls'}>
      <Button
        disabled={currentOriginRusPage === 1}
        onClick={() => setCurrentOriginRusPage(currentOriginRusPage - 1)}>
          Ранее
      </Button>
      <Button
        disabled={currentOriginRusPage === totalOriginRusPage}
        onClick={() => setCurrentOriginRusPage(currentOriginRusPage + 1)}>
          Далее
      </Button>
    </div>;
    break;
  case types.origin_eng:
    page = <Page
      pageNumber={currentOriginEngPage}
      loading={'Загружается'}
      renderAnnotationLayer={false}
    />;
    control = <div className={'ariph-controls'}>
      <Button
        disabled={currentOriginEngPage === 1}
        onClick={() => setCurrentOriginEngPage(currentOriginEngPage - 1)}>
          Ранее
      </Button>
      <Button
        disabled={currentOriginEngPage === totalOriginEngPage}
        onClick={() => setCurrentOriginEngPage(currentOriginEngPage + 1)}>
          Далее
      </Button>
    </div>;
    break;
  case types.paraphrase:
    page = <Page
      pageNumber={currentParaphrasePage}
      loading={'Загружается'}
      renderAnnotationLayer={false}
    />;
    control = <div className={'ariph-controls'}>
      <Button
        disabled={currentParaphrasePage === 1}
        onClick={() => setCurrentParaphrasePage(currentParaphrasePage - 1)}>
          Ранее
      </Button>
      <Button
        disabled={currentParaphrasePage === totalParaphrasePage}
        onClick={() => setCurrentParaphrasePage(currentParaphrasePage + 1)}>
          Далее
      </Button>
    </div>;
    break;
  default:
    throw new Error(`wrong type ${type}`);
  }

  return <TabPanel className={'ariph-type-block'}>
    {control}
    <Document
      className={'ariph-pdf-viewer'}
      file={url}
      loading={'Заргужается...'}
      onLoadError={console.error}
      onLoadSuccess={({numPages}) => onDocumentLoadSuccess(numPages,
        url,
        type,
        setTotalOriginRusPage,
        setTotalOriginEngPage,
        setTotalParaphrasePage)}
    >
      {page}
    </Document>
  </TabPanel>;
};

interface Props {
  book: number;
}

function Book(props: Props): JSX.Element {
  const book = props.book;

  return <div className={'ariph-data'}>
    <Tabs defaultIndex={2}>
      <TabList className={'ariph-type-list'}>
        <Tab>Кубицкий</Tab>
        <Tab>Ross</Tab>
        <Tab>Парафраз</Tab>
      </TabList>

      {renderTypeBlock(`${config.host}/api/${book}/origin_rus/pdf`, types.origin_rus)}
      {renderTypeBlock(`${config.host}/api/${book}/origin_eng/pdf`, types.origin_eng)}
      {renderTypeBlock(`${config.host}/api/${book}/paraphrase/pdf`, types.paraphrase)}
    </Tabs>
  </div>;
}

export default Book;
