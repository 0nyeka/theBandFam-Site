import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/components/AccountSettings.css'; // Import specific component styles
import './styles/components/Base.css'; // Import specific component styles
import './styles/components/Dashboard.css'; // Import specific component styles
import './styles/components/HomePage.css'; // Import specific component styles
import './styles/components/Navigation.css'; // Import specific component styles
import './styles/components/Post.css'; // Import specific component styles

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);