import { Button, Grid, Paper, TextField, TextareaAutosize } from '@mui/material';
// import { loadPDF, sendLLMChatMessageQuery } from '../utils/api';
import Box from '@mui/material/Box';
import * as React from 'react';

export default function Chat() {
  const [chatHistory, setChatHistory] = React.useState('')
  const [pdfFilePath, setPdfFilePath] = React.useState('')
  const [messageToQuery, setMessageToQuery] = React.useState('')

  const onUpload = async (pdfFilePath: string) => {
    // await loadPDF(pdfFilePath)
    alert(pdfFilePath)
    setPdfFilePath("")
  }

  const onSendMessage = async(query: string) => {
    setChatHistory(chatHistory + "\nUser: " + query + "\nLLM: " + '<Response goes here>')
    // await sendLLMChatMessageQuery(query)
    // TODO GET RESPONSE
    // setChatHistory(chatHistory + "\nLLM: " + '<Response goes here>')
    setMessageToQuery("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSendMessage(messageToQuery)
    }
  }

  return (
    <Box component="section" sx={{
        marginTop: 4,
        width: 600,
        height: 420,
        borderRadius: 1,
        bgcolor: 'white',
        color: 'black'
      }}>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <TextField 
            value={pdfFilePath}
            onChange={(e) => setPdfFilePath(e.target.value)}
            id="outlined-basic" label="PDF / Big Text file path" variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button onClick={() => onUpload(pdfFilePath)} variant="contained">Upload</Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          value={chatHistory}
          disabled
          id="outlined-multiline-flexible"
          multiline
          rows={4}
          sx={{
            width: 500,
            // overflowY: 'auto',
          }}
        />
      </Grid>
        <Grid item xs={12} sm={12}>
          <TextField 
            value={messageToQuery}
            onChange={(e) => setMessageToQuery(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            id="outlined-basic" label="Send a message..." variant="outlined" 
            sx={{
              width: 425
            }}
          />
          <Button variant="contained"
            onClick={() => onSendMessage(messageToQuery)}
            sx={{
              marginTop: 1,
              marginLeft: 1,
              // width: 600,
              // height: 420,
              // borderRadius: 1,
              // bgcolor: 'white',
              // color: 'black'
            }}>
          Send</Button>
        </Grid>
      </Grid>
    </Box>
  );
  
}