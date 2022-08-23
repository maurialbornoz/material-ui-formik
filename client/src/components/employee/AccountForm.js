import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import alertContext from '../../context/alert/alertContext';
import { createAccountService } from '../../services/accounts';


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
    accountName: '',
    alias: ''
}
const FORM_VALIDATION = Yup.object().shape({
    accountName: Yup.string()
        .required('Required')
        .min(5, 'Account name has at least 5 characters')
        .matches(/^[aA-zZ\s]+$/, 'Alias should contain only alphabetic characters'),
    alias: Yup.string()
        .required('Required')
        .min(8, 'Alias has at least 8 characters')
        .matches(/^[aA-zZ\s]+$/, 'Alias should contain only alphabetic characters'),

})


const AccountForm = () => {
    const [message, setMessage] = useState(null)
    const { showAlert} = useContext(alertContext)
    const {clientId} = useParams()

    useEffect(() => {
        if(message) {
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
                        onSubmit={(values, actions) => {
                            createAccountService({
                                accountName: values.accountName,
                                alias: values.alias,
                                owner: clientId
                            })
                            .then((data) => {
                                // console.log(data)
                    
                                setMessage({msg: 'The account was created successfully', type: 'success'})
                            })
                            .catch((error) => {
                                // console.log(error)
                                setMessage({msg: error.response.data.errors[0].msg, type: 'error'})
                            })
                            actions.resetForm({
                                values: {
                                    accountName: '',
                                    alias: ''
                                },
                            });
                        }}
                    >
                        <Form >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography>New Account Information</Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField 
                                        name="accountName"
                                        label="Account Name"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <TextField 
                                        name="alias"
                                        label="Alias"
                                        
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Button>
                                        Create Account
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
 
export default AccountForm