import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './components/Root/Root';
import * as serviceWorker from './serviceWorker';
import store from './store/index'
import { Provider } from 'react-redux';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
    whyDidYouRender(React);
}

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
