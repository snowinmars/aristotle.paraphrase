import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PDFViewer from 'pdf-viewer-reactjs';
import config from '../../configs/api';
import './Data.scss';

class Data extends React.Component {
  renderTypeBlock = (url) => {
    return <TabPanel className={'ariph-type-block'}>
      <PDFViewer
        css={'ariph-pdf-viewer'}
        canvasCss={'ariph-pdf-canvas'}
        navbarOnTop={true}
        hideZoom={true}
        hideRotation={true}
        document={{
          url: url,
        }}
      />
    </TabPanel>
  }

  render = () => {
    const book = this.props.book;
    const chapter = this.props.chapter;

    return <div className={'ariph-data'}>
      <div>Книга {book}, глава {chapter}</div>

      <Tabs defaultIndex={2}>
        <TabList className={'ariph-type-list'}>
          <Tab>Кубицкий</Tab>
          <Tab>Ross</Tab>
          <Tab>Парафраз</Tab>
        </TabList>

        {this.renderTypeBlock(`${config.host}/api/${book}/origin_rus/pdf`)}
        {this.renderTypeBlock(`${config.host}/api/${book}/origin_eng/pdf`)}
        {this.renderTypeBlock(`${config.host}/api/${book}/paraphrase/pdf`)}
      </Tabs>
    </div>
  }
}

export default Data;
