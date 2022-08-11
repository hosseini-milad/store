import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import './css/App.css'
import './css/fonts.css'
import reportWebVitals from './reportWebVitals';
import Proxy from './pages/proxy';
import Report from './pages/Report';
import HavaleOutPage from './pages/havaleOutPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Layout>
     <Router>
       <Routes>
         <Route path="/" element={<Report />}/>
         <Route path="/havale-in" element={<Home />}/>
         <Route path="/report" element={<Report />}/>
         <Route path="/havale-out" element={<HavaleOutPage />}/>
        </Routes>
     </Router>
    </Layout>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
