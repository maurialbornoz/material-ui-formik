import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import authContext from '../context/auth/authContext';
import alertContext from '../context/alert/alertContext';

import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';


import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import {
    Alert,
    Container,

    Typography,
} from '@mui/material'

import TextField from '../components/materialUI/TextField';
import Button from '../components/materialUI/Button'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const INITIAL_FORM_STATE = {
    username: '',
    password: ''
}
const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
})

const theme = createTheme();

const LoginForm = () => {
    const {alert, showAlert} = useContext(alertContext)
    const {authenticated, message, employee, passChangePending, login} = useContext(authContext)
    const navigate = useNavigate()

    useEffect(() => {

        if(authenticated){
             employee ? navigate('/create_client') : navigate('/accounts')
        }

        if(message){
            showAlert(message)
        }
        // eslint-disable-next-line
    },[authenticated, employee, message, passChangePending, navigate])

    return ( 
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 8,
                    marginBottom: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={(values) => {
                                login(values)
                            }}
                        >
                            <Form >
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />

                                <Button
                                    
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                Sign In
                                </Button>
                            </Form>

                                
                        </Formik>

                    </Box>
                </Box>
            
                {alert && alert.msg                   
                ? <Alert severity="error">{alert.msg}</Alert>
                : null
                }

                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
 
export default LoginForm;