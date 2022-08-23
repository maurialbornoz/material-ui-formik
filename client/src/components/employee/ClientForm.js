import React, { useContext, useEffect, useState } from 'react';
import alertContext from '../../context/alert/alertContext';
import { createClientService } from '../../services/clients';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import {
    Container,
    Grid,
    Typography,
} from '@mui/material'

import TextField from '../materialUI/TextField';
import Button from '../materialUI/Button'

const INITIAL_FORM_STATE = {
    name: '',
    surname: '',
    username: '',
    password: '',
    dni: '',
}
const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Name should contain only alphabetic characters'),
    surname: Yup.string()
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Surname should contain only alphabetic characters'),
    username: Yup.string()
        .required('Required')
        .min(6, 'Username should be at least 6 characters')
        .matches(/^[aA-zZ\s]+$/, 'Username should contain only alphabetic characters'),
    password: Yup.string()
        .required('Required')
        .min(6, 'Password should be at least 6 characters')
        .matches(/^((?=.*\d)|(?=.*[@$!%*#?&]))(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9@$!%*#?&]+$/, 'Password should contain uppercase, lowercase, and a symbol or a number'),
    dni: Yup.number()
        .integer()
        .typeError('Please enter a valid DNI')
        .required('Required'),
})



const ClientForm = () => {
    const { showAlert} = useContext(alertContext)
    const [message, setMessage] = useState(null)


    
    useEffect(() => {
        if(message){
            showAlert(message)
        }
        // eslint-disable-next-line
    }, [message])


    return ( 


            <Grid item xs={12}>
                <Container maxWidth='sm'  >
                    <div style={{marginTop: '100px'}}>

                        <Formik
                            initialValues={{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={(values) => {
                                // console.log(values)
                                    
                                createClientService(values)
                                .then((data) => {
                                    // console.log(data)
                        
                                    setMessage({msg: 'The client was created successfully.', type: 'success'})
                                })
                                .catch((error) => {
                                    console.log(error)
                                    
                                    setMessage({msg: error.response.data.errors[0].msg, type: 'error'})
                                })
                                
                            }}
                        >
                            <Form >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>Client Information</Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField 
                                            name="name"
                                            label="Name"
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField 
                                            name="surname"
                                            label="Surname"
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField 
                                            name="username"
                                            label="Username"
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField 
                                            name="password"
                                            label="Password"
                                            type='password'
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField 
                                            name="dni"
                                            label="DNI"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button>
                                            Submit Form
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Form>


                                
                        </Formik>
                    </div>
                </Container>

                
            </Grid>
      

     );
}
 
export default ClientForm;