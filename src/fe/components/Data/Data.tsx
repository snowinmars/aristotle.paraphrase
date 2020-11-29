import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import config from '../../configs/api';
import './Data.scss';
import {Document,Page,pdfjs} from "react-pdf";
import Button from "@material-ui/core/Button";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: {
        origin_rus: null,
        origin_eng: null,
        paraphrase: null,
      },
      current: {
        origin_rus: 1,
        origin_eng: 1,
        paraphrase: 1,
      },
    }
  }

  onDocumentLoadSuccess = (pageCount, url) => {
    const type = url.split('/').reverse()[1];

    switch (type) {
      case 'origin_rus':
        this.setState({total: {...this.state.total, origin_rus: pageCount}});
        break;
      case 'origin_eng':
        this.setState({total: {...this.state.total, origin_eng: pageCount}});
        break;
      case 'paraphrase':
        this.setState({total: {...this.state.total, paraphrase: pageCount}});
        break;
      default:
        throw new Error(`wrong type ${type}`);
    }
  }

  renderTypeBlock = (url) => {
    const type = url.split('/').reverse()[1];

    let page = null;
    let control = null;

    switch (type) {
      case 'origin_rus':
        page = <Page
          pageNumber={this.state.current.origin_rus}
          loading={"Загружается"}
          renderAnnotationLayer={false}
        />
        control = <div className={'ariph-controls'}>
          <Button
            disabled={this.state.current.origin_rus === 1}
            onClick={() => this.setState({current: {...this.state.current, origin_rus: this.state.current.origin_rus - 1}})}>
            Ранее
          </Button>
          <Button
            disabled={this.state.current.origin_rus === this.state.total.origin_rus}
            onClick={() => this.setState({current: {...this.state.current, origin_rus: this.state.current.origin_rus + 1}})}>
            Далее
          </Button>
        </div>
        break;
      case 'origin_eng':
        page = <Page
          loading={"Загружается"}
          renderAnnotationLayer={false}
          pageNumber={this.state.current.origin_eng}
        />
        control = <div className={'ariph-controls'}>
          <Button
            disabled={this.state.current.origin_eng === 1}
            onClick={() => this.setState({current: {...this.state.current, origin_eng: this.state.current.origin_eng - 1}})}>
            Ранее
          </Button>
          <Button
            disabled={this.state.current.origin_eng === this.state.total.origin_eng}
            onClick={() => this.setState({current: {...this.state.current, origin_eng: this.state.current.origin_eng + 1}})}>
            Далее
          </Button>
        </div>
        break;
      case 'paraphrase':
        page = <Page
          loading={"Загружается"}
          renderAnnotationLayer={false}
          pageNumber={this.state.current.paraphrase}
        />
        control = <div className={'ariph-controls'}>
          <Button
            disabled={this.state.current.paraphrase === 1}
            onClick={() => this.setState({current: {...this.state.current, paraphrase: this.state.current.paraphrase - 1}})}>
            Ранее
          </Button>
          <Button
            disabled={this.state.current.paraphrase === this.state.total.paraphrase}
            onClick={() => this.setState({current: {...this.state.current, paraphrase: this.state.current.paraphrase + 1}})}>
            Далее
          </Button>
        </div>
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
        onLoadSuccess={({ numPages }) => this.onDocumentLoadSuccess(numPages, url)}
      >
        {page}
      </Document>
    </TabPanel>
  }

  render = () => {
    const book = this.props.book;

    return <div className={'ariph-data'}>
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
