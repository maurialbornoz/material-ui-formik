import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"


import AuthState from './context/auth/authState';
import AlertState from './context/alert/alertState'

import PrivateRouteForClients from './components/rutas/PrivateRouteForClients'
import PrivateRouteForEmployees from './components/rutas/PrivateRouteForEmployees'

import ClientForm from './components/employee/ClientForm';
import LoginForm from './components/LoginForm'


import AccountForm from './components/employee/AccountForm';
import ClientList from './components/employee/ClientList';
import ClientAccounts from './components/employee/ClientAccounts';
import Deposit from './components/employee/Deposit';
import AccountToDelete from './components/employee/AccountToDelete';
import Accounts from './components/client/Accounts';
import PasswordChangeForm from './components/PasswordChangeForm';
import Transactions from './components/client/Transactions';
import Transfer from './components/client/Transfer';

import Layout from './components/materialUI/layout/Layout';

function App() {
  return (
    <>
     
      <AlertState>
        <AuthState>

        

            <BrowserRouter>
              <Layout>
                  <Routes>
                    <Route path='/' element={<LoginForm/>}/>
                    <Route path='/change_password' element={<PasswordChangeForm/>}/>

                    <Route path="/accounts" element={<PrivateRouteForClients><Accounts/></PrivateRouteForClients>}/>
                    <Route path="/transfer" element={<PrivateRouteForClients><Transfer/></PrivateRouteForClients>}/>
                    <Route path="/my_transactions" element={<PrivateRouteForClients><Transactions/></PrivateRouteForClients>}/>
                    
                    <Route path="/create_client" element={<PrivateRouteForEmployees> <ClientForm/></PrivateRouteForEmployees>}/>
                    <Route path='/client_list' element={<PrivateRouteForEmployees><ClientList/></PrivateRouteForEmployees> }/>
                    <Route path="/client_account_list/:clientId" element={<PrivateRouteForEmployees><ClientAccounts/></PrivateRouteForEmployees>}/>
                    <Route path='/create_account/:clientId' element={<PrivateRouteForEmployees> <AccountForm/></PrivateRouteForEmployees>} />
                    <Route path='/deposit' element={<PrivateRouteForEmployees><Deposit/></PrivateRouteForEmployees> }/>
                    <Route path='/to_delete' element={<PrivateRouteForEmployees><AccountToDelete/></PrivateRouteForEmployees> }/>
                    <Route path="/transactions" element={<PrivateRouteForEmployees><Transactions/></PrivateRouteForEmployees>}/>

                  </Routes>
              </Layout>
            </BrowserRouter>
  
       
        </AuthState>
      
      </AlertState>
    </>

  );
}

export default App;
