import React from 'react';
import './App.scoped.scss';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Menu from '../Menu/Menu';
import * as Scroll from 'react-scroll';
import Status from '../Status/Status';
import Downloads from '../Downloads/Downloads';
import Book from '../Book/Book';
import About from '../About/About';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';

function App(): JSX.Element {
  return (
    <div className="app">
      <BrowserRouter>
        <Menu />

        <IconButton
          className={'ariph-to-top'}
          onClick={() => Scroll.animateScroll.scrollToTop({
            duration: 200,
          })}
        >
          <ArrowUpwardIcon />
        </IconButton>

        <Switch>
          <Route path={'/status'}>
            <Status />
          </Route>

          <Route path={'/downloads'}>
            <Downloads />
          </Route>

          <Route path={'/books/b1'}>
            <Book book={1} />
          </Route>

          <Route path={'/books'}>
            Оглавление
            <ul>
              <li>
                <Link to={'/books/b1'}>Книга первая: причины</Link>
              </li>
              <li>
                <Link to={'/books/b2'}>Книга вторая</Link>
              </li>
            </ul>
          </Route>

          <Route path={'/'}>
            <About />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
