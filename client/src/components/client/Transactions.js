import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { getTransactions } from '../../services/transaction'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';



export default function Transactions() {
    const { state } = useLocation();
    const { accountId } = state || {};
    const [transactions, setTransactions] = React.useState([])

    React.useEffect(() => {
        getTransactions(accountId)
        .then((data) => {
            // console.log(data)
            setTransactions(data.transactions)
        })
        .catch((error) => {
            // console.log(error)
        })
        // eslint-disable-next-line
    }, [])

    
  return (
    <Box sx={{ width: '100%', py: 8 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Origin</TableCell>
                <TableCell align="right">Destination</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {transactions.map((row) => (
                <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                      {row.type}
                  </TableCell>
                  <TableCell align="right">{(row.id_destination._id === accountId || row.type === 'DEPOSIT') ? `+$${row.amount}` : `-$${row.amount}`}</TableCell>
                  <TableCell align="right">{row.id_origin ? row.id_origin.alias : '-'}</TableCell>
                  <TableCell align="right">{row.id_destination.alias}</TableCell>

                
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
