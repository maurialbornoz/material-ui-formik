import React, { useContext } from 'react'
import Box from '@mui/material/Box';

import LeftbarEmployee from '../Leftbar/LeftbarEmployee';
import LeftbarClient from '../Leftbar/LeftbarClient';
import TopBar from '../TopBar/TopBar';
import { CssBaseline } from '@mui/material';
import authContext from '../../../context/auth/authContext';


const Layout = (props) => {
    const {employee, authenticated} = useContext(authContext)
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
    return ( 
        <div >
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                {authenticated ? (
                    employee ? (
                        <>
                            <TopBar open={open} handleDrawerOpen={handleDrawerOpen}/>
                            <LeftbarEmployee open={open} handleDrawerClose={handleDrawerClose}/>
                        </>
                    ) : (
                        <>
                            <TopBar open={open} handleDrawerOpen={handleDrawerOpen}/>
                            <LeftbarClient open={open} handleDrawerClose={handleDrawerClose}/>
                        </>
                    )
                    
                ) :
                    null
                }
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {props.children}
                </Box>
            </Box>
        </div>
     );
}
 
export default Layout;