import React, { useContext, useEffect } from 'react'
import { styled, } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import IconButton from '@mui/material/IconButton';
import authContext from '../../../context/auth/authContext';
import { Alert } from '@mui/material';
import { Container } from '@mui/system';
import alertContext from '../../../context/alert/alertContext';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
const TopBar = ({open, handleDrawerOpen}) => {
    const {user, logout, authenticatedUser} = useContext(authContext)
    const {alert} = useContext(alertContext)
    useEffect(() => {
        authenticatedUser()
        // eslint-disable-next-line
    }, [])

    return ( 
        <AppBar  position="fixed" open={open} >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            
           
          <Container disableGutters maxWidth={false} sx={{ display: "flex", alignItems: 'center', justifyContent: "flex-start", disableGutters:'true'}} >

                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
              
              

                <Typography line-height='0' variant="h6" noWrap component="div">
                    {user ? <p>Welcome {user.name} {user.surname}</p> : null}
                </Typography>
              
          </Container>
          <Container sx={{ display: "flex", alignItems: 'center', justifyContent: "flex-end" }}>

                {alert && alert.msg ? 
                  
                  (alert.type === 'success' 
                    ? <Alert severity="success">{alert.msg}</Alert>
                    : <Alert severity="error">{alert.msg}</Alert>
                  )
                : null
                }
               
            

          
                <IconButton 
                    color="inherit"
                    onClick={() => logout()}
                    >
                    <ExitToAppIcon/>
                </IconButton>
          </Container>
            

            

            
        </Toolbar>
      </AppBar>

     );
}
 
export default TopBar;