import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PDFViewer from 'pdf-viewer-reactjs'
import './Data.scss';

class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      core: 'Loading...',
      origin_rus: 'Loading...',
      origin_rus_notes: 'Loading...',
      origin_eng: 'Loading...',
      origin_eng_notes: 'Loading...',
      paraphrase: 'Loading...',
      paraphrase_notes: 'Loading...',
    }
  }

  renderTypeBlock = (content, notes) => {
    return <TabPanel className={'ariph-type-block'}>
      {

      }
    </TabPanel>
  }

  render = () => {
    const book = this.props.book;
    const chapter = this.props.chapter;
    const host = 'http://localhost:5002';

    return <div className={'ariph-data'}>
      <div>Книга {book}, глава {chapter}</div>

      <div>{this.state.core}</div>

      <Tabs defaultIndex={2}>
        <TabList className={'ariph-type-list'}>
          <Tab>Кубицкий</Tab>
          <Tab>Ross</Tab>
          <Tab>Парафраз</Tab>
        </TabList>

        {this.renderTypeBlock(this.state.origin_eng, this.state.origin_eng_notes)}
        {this.renderTypeBlock(this.state.paraphrase, this.state.paraphrase_notes)}

        <TabPanel>
          <PDFViewer
            css={'ariph-pdf-viewer'}
            canvasCss={'ariph-pdf-canvas'}
            navbarOnTop={true}
            hideZoom={true}
            hideRotation={true}
            document={{
              url: `${host}/api/${book}/${chapter}/origin_rus/pdf`,
            }}
          />

        </TabPanel>
      </Tabs>
    </div>
  }
}

export default Data;
