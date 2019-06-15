import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AV from 'leancloud-storage';

if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('debug', 'leancloud*,LC*');
}
  
AV.init({
    appId: 'CxF6cM3TfmuCvcI8RIhMI5vI-9Nh9j0Va',
    appKey: 'tdvMD1BR8zDSIT82glxgTNuF',
});


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
