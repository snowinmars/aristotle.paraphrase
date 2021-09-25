import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import App from './components/App/App';
import store from './redux/store';

const app = <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>;

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error('No root react element found');

// react-snap
if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
        app,
        rootElement);
} else {
    ReactDOM.render(
        app,
        rootElement);
}
