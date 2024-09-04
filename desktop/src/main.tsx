import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from '@/components';
import { ThemeProvider } from '@/contexts';
import App from './App.tsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <Layout>
                <App />
            </Layout>
        </ThemeProvider>
    </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
});
