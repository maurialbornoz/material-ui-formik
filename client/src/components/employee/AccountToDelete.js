import React, { useContext, useEffect, useState } from 'react'

import alertContext from '../../context/alert/alertContext'
import { getAccountsToDeleteService, deleteAccountService } from '../../services/accounts'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ClientAccounts() {
    const { showAlert} = useContext(alertContext)
    const [accounts, setAccounts] = useState([])
    const [message, setMessage] = useState(null)
    useEffect(() => {
        if(message){
            showAlert(message)
        }
        getAccountsToDeleteService()
        .then((data) => {
            // console.log(data)
            setAccounts(data)
        })
// eslint-disable-next-line
    }, [message])
    
    const handleDelete = (id) => {
        // console.log(id)
        deleteAccountService(id)
        .then((data) => {
            setMessage({msg: 'The account was deleted successfully', type: 'success'})
        })
    }
    
  return (
    <Box sx={{ width: '100%', py: 8 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Alias</TableCell>
                <TableCell align="left">Created</TableCell>
                <TableCell align="right">Delete</TableCell>

            </TableRow>
            </TableHead>
            <TableBody>
            {accounts.map((row) => (
                <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                      {row.alias}
                  </TableCell>
                  <TableCell align='left'>{row.created } </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(row._id)}>
                        <DeleteIcon/>
                    </IconButton>
                  </TableCell>


                
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}
