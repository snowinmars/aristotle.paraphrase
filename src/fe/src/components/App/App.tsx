import React from 'react';
import styles from './App.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Menu from '../Menu/Menu';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import ChapterView from "../ChapterView/ChapterView";
import GeneralBookView from "../GeneralBookView/GeneralBookView";
import Container from "react-bootstrap/Container";
import BooksListView from "../BooksListView/BooksListView";
import Footer from "../Footer/Footer";
import {Settings} from "../Settings/Settings";
import {loadColorTheme} from "../Settings/helpers";

const App = (): JSX.Element => {
  loadColorTheme();

  return (
      <div className={styles.prfApp}>
        <Router>
          <Menu/>

          <Container>
            <Switch>
              <Route path={'/books/:bookId/:chapterId'}>
                <ChapterView>
                </ChapterView>
              </Route>
              <Route path={'/books/:bookId'}>
                <GeneralBookView>
                </GeneralBookView>
              </Route>
              <Route path={'/books'}>
                <BooksListView>
                </BooksListView>
              </Route>
              <Route path={'/contacts'}>
                <Contacts>
                </Contacts>
              </Route>
              <Route path={'/settings'}>
                <Settings>
                </Settings>
              </Route>
              <Route path={'/'}>
                <About>
                </About>
              </Route>
            </Switch>
          </Container>

          <Footer />
        </Router>
      </div>
  );
};

export default App;
