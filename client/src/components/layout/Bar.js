import React, { useContext, useEffect } from 'react'
import authContext from '../../context/auth/authContext';

const Bar = () => {
    const {user, logout, authenticatedUser} = useContext(authContext)

    useEffect(() => {
        authenticatedUser()
    }, [])
    return ( 
        <header>
            <h1>HOMEBANKING</h1>
            {user ? <p>Bienvenido {user.name} {user.surname}</p> : null}
            <nav>
                <button onClick={() => logout()}>Cerrar sesión</button>
            </nav>
        </header>

     );
}
 
export default Bar;