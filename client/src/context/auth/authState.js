import React, { useReducer } from 'react';
import { loginService, getAuthenticatedUserService } from '../../services/login';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOG_OUT,
    GET_USER
} from '../../types'

const AuthState = (props) => {
    const initialState = {
        token: window.localStorage.getItem('token'),
        passChangePending: null,
        authenticated: null,
        employee: null,
        message: null,
        user: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)


    const authenticatedUser = async () => {
        const token = window.localStorage.getItem('token')
        getAuthenticatedUserService(token)
        .then((data) => {
            dispatch({
                type: GET_USER,
                payload: data
            })
        })
        .catch((error) => {

            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        })   
    }

    const login = (data) => {
        loginService(data)
        .then((data) => {
            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: data
            })
        })
        .catch((error) => {
            
            const message = {
                msg: error.response.data.msg,
                type: 'error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: message
            })
        })
    }

    const logout = () => {
        dispatch({
            type: LOG_OUT,
            payload: "Sesión cerrada"
        })
    }

    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                passChangePending: state.passChangePending,
                authenticated: state.authenticated,
                employee: state.employee,
                message: state.message,
                user: state.user,
                loading: state.loading,
                login,
                logout,
                authenticatedUser
            }}
        >{props.children}
        
        </AuthContext.Provider>
    )
}

export default AuthState;