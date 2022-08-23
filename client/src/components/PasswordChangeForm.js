import React, { useContext, useEffect, useState } from 'react'
import alertContext from '../context/alert/alertContext';
import authContext from '../context/auth/authContext';
import { useNavigate } from 'react-router';
import { useField } from '../hooks/useField';
import { updateClientService } from '../services/clients';

const PasswordChangeForm = () => {
    const newPassword = useField({type: 'password'})
    const newPasswordRepeated = useField({type: 'password'})
    const [message, setMessage] = useState(null)
    const {alert, showAlert} = useContext(alertContext)
    const {passChangePending, authenticatedUser} = useContext(authContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!passChangePending){
            navigate('/accounts')
        }
        if(message) {
            showAlert(message.content, message.format)
        }
        // eslint-disable-next-line
    }, [message, passChangePending, navigate])

    // useEffect(() => {
    //     authenticatedUser();
    //     // eslint-disable-next-line
    // }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        // if(newPassword.value !== newPasswordRepeated.value){
        //     setMessage({content: 'Las contraseñas no coinciden', format: 'simple'})
        // }
        updateClientService({
            newPassword : newPassword.value, 
            newPasswordRepeated: newPasswordRepeated.value
        })
        .then((data) => {
            authenticatedUser();
        })
        .catch((error) => {
            // console.log(error)
            setMessage({content: error.response.data.errors, format: 'array'})
        })
        // newPassword.resetValue()
        newPasswordRepeated.resetValue()
    }
    return ( 
        <div>
            <h1>Cambiar contraseña</h1>
            <form onSubmit={handleSubmit}>
                <p>La nueva contraseña debe tener por lo menos 6 caracteres, mayúsculas y minúsculas y por lo menos un número o un símbolo</p>
                <input value={newPassword.value} placeholder='Nueva contraseña' onChange={newPassword.onChange} type={newPassword.type}></input>
                <input value={newPasswordRepeated.value} placeholder='Repetir nueva contraseña' onChange={newPasswordRepeated.onChange} type={newPasswordRepeated.type}></input>
                <button type='submit'>Guardar</button>
            </form>
            {alert ? 
            (   
                (alert.format === 'array') ? 
                (<div>
                        {alert.msg.map((m, index) => {
                      
                            return (
                                <p key={index}>{m.msg}</p>
                            )
                        })}
                    </div>)
                : <p>{alert.msg}</p>
                    
            )
            : null}
        </div>
     );
}
 
export default PasswordChangeForm;