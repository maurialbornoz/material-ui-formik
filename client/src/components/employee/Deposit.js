import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import alertContext from '../../context/alert/alertContext';
import { depositService } from '../../services/transaction';
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
    alias: Yup.string()
        .required('Required')
        .min(6, 'Alias has at least 6 characters')
        .matches(/^[aA-zZ\s]+$/, 'Alias should contain only alphabetic characters'),
    amount: Yup.number()
        .required('Required')
        .typeError('Please specify valid a number')
        .positive('Amount should be grater than zero')
        // .matches(/^\d+(\.\d{0,2})?$/, 'Amount should be positive'),
})
const Deposit = () => {

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
                        alias: alias ? alias : '',
                        amount: ''
                    }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values, actions) => {
                        depositService(values)
                        .then((data) => {
                            // console.log(data)
                            setMessage({msg: 'The deposit was made successfully.', type: 'success'})
                        })
                        .catch((error) => {
                            // console.log(error)
                            setMessage({msg: error.response.data.errors[0].msg, type: 'error'})
                        })
                        actions.resetForm({
                            values: {
                                alias: alias ? alias : '',
                                amount: ''
                            },
                        });
                    }}
                >
                    <Form >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Deposit information</Typography>
                            </Grid>
                            <Grid item xs={6} >
                                <TextField 
                                    name="alias"
                                    label="Alias"
                                />
                            </Grid>
                            <Grid item xs={6} >
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
 
export default Deposit;