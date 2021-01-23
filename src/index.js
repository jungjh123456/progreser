import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import MyModal from './ModalPortal/MyModal/MyModal';
const history = createBrowserHistory();
// // import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// const store = createStore();
ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
