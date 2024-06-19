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
  tokensPerSecond: string,
  load: any,
) {
  return { model, active, tokensPerSecond, load };
}

function createLoadButton(active: boolean) {
    if (!active)
        return <Button variant="contained">Download</Button>
    else
        return <Button disabled variant="contained">Download</Button>
}

const rows = [
  createData('fpsyg-09-01395.pdf', true, '06-19-2024', createLoadButton(true)),
  createData('state_of_the_union.txt', false, '06-19-2024', createLoadButton(false)),
  createData('ZEPT_14_2240691.pdf', false, '06-18-2024', createLoadButton(false)),
  createData('test2.txt', false, '06-17-2024', createLoadButton(false)),
  createData('test1.txt', false, '06-17-2024', createLoadButton(false)),
];

export default function FileUpload() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Document</strong></TableCell>
            <TableCell><strong>RAG Ingested</strong></TableCell>
            <TableCell><strong>Date Uploaded</strong></TableCell>
            <TableCell><strong>Download</strong></TableCell>
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