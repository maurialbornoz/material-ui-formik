import React from 'react'
import { Link } from 'react-router-dom';
const EmployeeSidebar = () => {
    return ( 
        <div>
            <Link to='/create_client'>Crear un cliente</Link>
            <Link to='/client_list'>Clientes y Cuentas</Link>
            <Link to='/deposit'>Depositar sueldo a un cliente</Link>
            <Link to='/to_delete'>Cuentas a eliminar</Link>
        </div>
     );
}
 
export default EmployeeSidebar;