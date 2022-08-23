import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom'
import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';

const PrivateRouteForClients = ({children}) => {
    const {authenticated, employee, passChangePending, loading, authenticatedUser} = useContext(authContext)
    const {hideAlert} = useContext(alertContext)
    useEffect(()=> {
        authenticatedUser()
        hideAlert()

          // eslint-disable-next-line
    }, [])
    if(!authenticated && !loading){
        return <Navigate to='/' replace={true} />
    } else {
        if(!passChangePending){

            if(!employee){
                if(loading) return
                return children
            } else{
                return <Navigate to='/create_client' replace={true} />
            }
        } else {
            return <Navigate to='/change_password' replace={true} />
        }
    }
}
 
export default PrivateRouteForClients;