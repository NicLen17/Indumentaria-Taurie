import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from "axios";
import App from './App.jsx'
import React from 'react';

axios.defaults.baseURL = 'http://localhost:4000/api/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
