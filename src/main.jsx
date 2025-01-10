import { HashRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
