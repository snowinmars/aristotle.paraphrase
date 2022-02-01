import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import React, {Suspense} from 'preact/compat';
import { h, Component, render }  from 'preact'; /** @jsx h */
import {Router} from 'preact-router';
import styles from './App.module.scss';
import {colors, loadColorTheme} from "../../utils/color-settings";

/*
const About = React.lazy(() => import('../About/About'))
const Contacts = React.lazy(() => import('../Contacts/Contacts'));
const ChapterView = React.lazy(() => import("../ChapterView/ChapterView"));
const GeneralBookView = React.lazy(() => import("../GeneralBookView/GeneralBookView"));
const Container = React.lazy(() => import("react-bootstrap/Container"));
const BooksListView = React.lazy(() => import("../BooksListView/BooksListView"));
const Settings = React.lazy(() => import("../Settings/Settings"));
 */
const UiKitDebug = React.lazy(() => import('../UiKit/UiKit'));
const About = React.lazy(() => import('../About/About'));
const Menu = React.lazy(() => import('../Menu/Menu'));
const Contacts = React.lazy(() => import('../Contacts/Contacts'));

const App = (): JSX.Element => {
  loadColorTheme(colors);

  return (
    <div className={styles.prfApp}>
      <Suspense fallback={<Loader/>}>
        <Router>
          <Menu/>

          <Contacts path={'/contacts'} />
          <About path={'/'} />

          <Footer/>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
