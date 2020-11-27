import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
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

  request = (book, chapter, type, callback) => {
    const host = 'http://localhost:5002';
    return axios.get(`${host}/api/${book}/${chapter}/${type}/pdf`)
      .then(r => {
        callback(r.data);
      })
  }

  componentDidMount = () => {
    const book = this.props.book;
    const chapter = this.props.chapter;

    return this.request(book, chapter, 'origin_eng', (v) => this.setState({origin_eng: v}));
    // this.request(book, chapter, 'core_pdf', (v) => this.setState({core: v}))
    //   .then(() => this.request(book, chapter, 'paraphrase_pdf', (v) => this.setState({paraphrase: v})))
    //   .then(() => this.request(book, chapter, 'paraphrase_notes_pdf', (v) => this.setState({paraphrase_notes: v})))
    //   .then(() => this.request(book, chapter, 'origin_rus_pdf', (v) => this.setState({origin_rus: v})))
    //   .then(() => this.request(book, chapter, 'origin_rus_notes_pdf', (v) => this.setState({origin_rus_notes: v})))
    //   .then(() => this.request(book, chapter, 'origin_eng_pdf', (v) => this.setState({origin_eng: v})))
    //   .then(() => this.request(book, chapter, 'origin_eng_notes_pdf', (v) => this.setState({origin_eng_notes: v})));
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

    return <div className={'ariph-data'}>
      <div>Книга {book}, глава {chapter}</div>

      <div>{this.state.core}</div>

      <Tabs defaultIndex={2}>
        <TabList className={'ariph-type-list'}>
          <Tab>Кубицкий</Tab>
          <Tab>Ross</Tab>
          <Tab>Парафраз</Tab>
        </TabList>

        {this.renderTypeBlock(this.state.origin_rus, this.state.origin_rus_notes)}
        {this.renderTypeBlock(this.state.origin_eng, this.state.origin_eng_notes)}
        {this.renderTypeBlock(this.state.paraphrase, this.state.paraphrase_notes)}
      </Tabs>
    </div>
  }
}

export default Data;
