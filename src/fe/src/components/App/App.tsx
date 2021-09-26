import React, { Suspense } from 'react';
import styles from './App.module.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Menu from '../Menu/Menu';
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";

const About = React.lazy(() => import('../About/About'))
const Contacts = React.lazy(() => import('../Contacts/Contacts'));
const ChapterView = React.lazy(() => import("../ChapterView/ChapterView"));
const GeneralBookView = React.lazy(() => import("../GeneralBookView/GeneralBookView"));
const Container = React.lazy(() => import("react-bootstrap/Container"));
const BooksListView = React.lazy(() => import("../BooksListView/BooksListView"));
const Settings = React.lazy(() => import("../Settings/Settings"));
import {loadColorTheme} from "../Settings/helpers";

const App = (): JSX.Element => {
  loadColorTheme();

  return (
    <div className={styles.prfApp}>
      <Suspense fallback={<Loader />}>
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

          <Footer/>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
