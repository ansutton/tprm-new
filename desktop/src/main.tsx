import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from './components/Layout/Layout';
import App from './App.tsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Layout>
            <App />
        </Layout>
    </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
});

// Apply Dark Theme
window.ipcRenderer.on('theme-changed', (isDarkMode) => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
