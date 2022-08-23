import * as React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { getClientAccountsService } from '../../services/accounts';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PaidIcon from '@mui/icons-material/Paid';
import { IconButton } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));


  


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function ClientAccounts() {
    const [accounts, setAccounts] = React.useState([])
    const [rows, setRows] = React.useState([])
    const [searched, setSearched] = React.useState("")

    const {clientId} = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {
        getClientAccountsService(clientId)
        .then((data) => {
            // console.log(data)
            setAccounts(data.accounts)
            setRows(data.accounts)
        })
      // eslint-disable-next-line
    }, [])

    const requestSearch = (e) => {
        setSearched(e.target.value)
        if(e.target.value !== ''){
            const filteredRows = accounts.filter((row) => 
              row.accountName.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setRows(filteredRows);
        } else {
            setRows(accounts)
        }
      };
    
  return (
    <Box sx={{ width: '100%', py: 8 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searched}
              inputProps={{ 'aria-label': 'search' }}
              onChange={requestSearch}
            />
          </Search>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Account Name</TableCell>
                <TableCell align="left">Alias</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Transactions</TableCell>
                <TableCell align="right">Deposit</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                      {row.accountName}
                  </TableCell>
                  <TableCell align="left">{row.alias}</TableCell>
                  <TableCell align="right">${row.balance}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => navigate('/transactions', { state: { accountId : row._id } })}>
                      <CurrencyExchangeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right"> 
                    <IconButton onClick={() => navigate('/deposit', { state: { alias : row.alias } })}>
                      <PaidIcon/> 
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
