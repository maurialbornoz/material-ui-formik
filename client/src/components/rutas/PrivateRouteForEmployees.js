import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import authContext from '../../context/auth/authContext';

const PrivateRouteForEmployees = ({children}) => {
    const {authenticated, employee, loading, authenticatedUser} = useContext(authContext)
    useEffect(()=> {
        authenticatedUser()
          // eslint-disable-next-line
    }, [])
    if(!authenticated && !loading){
        return <Navigate to='/' replace={true} />   
    } else {
        if(!employee){
            if(loading) return
            return <Navigate to='/accounts' replace={true} />
        } else{
            return children
        }
    }
}
 
export default PrivateRouteForEmployees;