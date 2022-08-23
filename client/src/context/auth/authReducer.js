import {
    LOGIN_ERROR,
    LOGIN_SUCCESSFUL,
    LOG_OUT,
    GET_USER
} from '../../types'

const authReducer = (state, action) => {
    switch(action.type){
        case LOGIN_SUCCESSFUL:
 
            window.localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                authenticated: true,
                employee: action.payload.employee,
                passChangePending: action.payload.passChangePending,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
                employee: action.payload.user.employee,
                passChangePending: action.payload.user.passChangePending,
                loading: false
            }
        case LOGIN_ERROR: 
        case LOG_OUT:
            // console.log(action.payload)
            window.localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                passChangePending: null,
                authenticated: null,
                employee: null,
                message: action.payload,
                loading: false
            }
        default: return state
    }
}

export default authReducer