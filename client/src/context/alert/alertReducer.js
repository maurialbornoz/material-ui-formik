import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../../types'

const alertReducer = (state, action) => {
    switch(action.type){
        case SHOW_ALERT:
            // console.log(action.payload)
            return {
                alert: action.payload
            }
        case HIDE_ALERT:
            return {
                alert: null
            }
        default: return state
    }
     
}
 
export default alertReducer;