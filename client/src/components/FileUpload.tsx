import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import * as React from 'react';

// See https://mui.com/material-ui/react-table/#collapsible-table as alternative

function createData(
  model: string,
  active: boolean,
  tokensPerSecond: number,
  load: any,
) {
  return { model, active, tokensPerSecond, load };
}

function createLoadButton(active: boolean) {
    if (!active)
        return <Button variant="contained">Load</Button>
    else
        return <Button disabled variant="contained">Load</Button>
}

const rows = [
  createData('Codellama-7b-instruct', true, 5.4, createLoadButton(true)),
  createData('Phi-2', false, 6.7, createLoadButton(false)),
  createData('Gemma', false, 4.9, createLoadButton(false)),
  createData('Mistral', false, 7.3, createLoadButton(false)),
  createData('Llama-2', false, 8.1, createLoadButton(false)),
];

export default function FileUpload() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Model</strong></TableCell>
            <TableCell><strong>Active</strong></TableCell>
            <TableCell><strong>Tokens/sec</strong></TableCell>
            <TableCell><strong>Load</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.model}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.model}
              </TableCell>
              <TableCell>{row.active ? 'True' : 'False'}</TableCell>
              <TableCell>{row.tokensPerSecond}</TableCell>
              <TableCell>{row.load}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}