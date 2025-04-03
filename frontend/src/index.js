import React from 'react';  // import react
import ReactDOM from 'react-dom/client'; // this renders the react components to the DOM (document object model)
import './index.css';//style
import App from './App'; //import main app
import reportWebVitals from './reportWebVitals'; // this monitors performance

const root = ReactDOM.createRoot(document.getElementById('root'));  // create root
root.render( //render root with app in it
  <React.StrictMode> {/*strict mode helps detect problems*/}
    <App />
  </React.StrictMode>
);

reportWebVitals(); //performance checks
