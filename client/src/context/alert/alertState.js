import { useReducer } from 'react'
import alertContext from './alertContext'
import alertReducer from './alertReducer'
import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types'

const AlertState = (props) => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    const showAlert = ({msg, type}) => {
        //  console.log(msg, type)
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                type
            }
        })

        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT,
            })
        }, 5000);
    }

    const hideAlert = () => {
        dispatch({
            type: HIDE_ALERT,
        })
    }

    return(
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert,
                hideAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState