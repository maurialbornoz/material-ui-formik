import React from 'react'
import { Link } from 'react-router-dom';
const ClientSidebar = () => {
    return ( 
        <div>
            
            <Link to='/accounts'>Mis Cuentas</Link>
            <Link to='/transfer'>Realizar una transferencia</Link>
           
        </div>
     );
}
 
export default ClientSidebar;