import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import { transferService } from '../../services/transaction';
// import EmployeeSidebar from '../layout/EmployeeSidebar';
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {
    Container,
    Grid,
    Typography,
} from '@mui/material'

import TextField from '../materialUI/TextField';
import Button from '../materialUI/Button'

const FORM_VALIDATION = Yup.object().shape({
    accountOriginAlias: Yup.string()
        .required('Required')
        .min(6, 'Alias has at least 6 characters')
        .matches(/^[aA-zZ\s]+$/, 'Alias should contain only alphabetic characters'),
    accountDestinationAlias: Yup.string()
        .required('Required')
        .min(6, 'Alias has at least 6 characters')
        .matches(/^[aA-zZ\s]+$/, 'Alias should contain only alphabetic characters'),
    amount: Yup.number()
        .required('Required')
        .typeError('Please specify valid a number')
        .positive('Amount should be grater than zero')
})
const Transfer = () => {

    const [message, setMessage] = useState(null)
    const {showAlert} = useContext(alertContext)

    const { state } = useLocation();
    const { alias } = state || {};

    // console.log(alias)


    useEffect(() => {
        if(message){
            // console.log(message)
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
                        accountOriginAlias: alias,
                        accountDestinationAlias: '',
                        amount: ''
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values, actions) => {
                        transferService(values)
                        .then((data) => {
                            // console.log(data)
                            setMessage({msg: 'The transfer was made successfully.', type: 'success'})
                        })
                        .catch((error) => {
                            // console.log(error)
                            setMessage({msg: error.response.data.errors[0].msg, type: 'error'})
                        })
                        actions.resetForm({
                            values: {
                                accountOriginAlias: alias,
                                accountDestinationAlias: '',
                                amount: ''
                            },
                        });
                    }}
                >
                    <Form >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Transfer information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    name="accountOriginAlias"
                                    label="Alias of your Account"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField 
                                    name="accountDestinationAlias"
                                    label="Destination Account Alias"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField 
                                    name="amount"
                                    label="Amount"
                                    
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
 
export default Transfer;