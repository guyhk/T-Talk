import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Board from './Board/Board'
//import Menu from './../src/therapist_menu/Menu' 
//import TherapistMenu from './../src/pages/TherapistMenu'

import * as serviceWorker from './serviceWorker';



ReactDOM.render(
  <React.StrictMode>
    
    <App/>
    
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
