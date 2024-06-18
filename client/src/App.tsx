import FileUpload from './components/FileUpload';
import { Grid } from '@mui/material';
import Chat from './components/Chat';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FileUpload></FileUpload>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Chat></Chat>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default App;
