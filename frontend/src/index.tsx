import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Type assertion for createRoot since TypeScript needs explicit null check
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance monitoring with type annotation for the reporting function
const reportWebVitalsCallback = (metric: any): void => {
  console.log(metric);
  // TODO: Add analytics service integration here
};

reportWebVitals(reportWebVitalsCallback);
