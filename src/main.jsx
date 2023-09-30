import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import axios from "axios";
import App from './App.jsx'
import React from 'react';
import { Analytics } from '@vercel/analytics/react';


axios.defaults.baseURL = 'http://localhost:4000/api/';
axios.defaults.baseURL = 'https://backendtaurie.onrender.com/api/';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
