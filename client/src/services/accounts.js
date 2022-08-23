import axios from 'axios'
const baseURL = '/api/accounts'

export const createAccountService = async (newAccount) => {
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(baseURL, newAccount, config)
    return res.data
}

export const getAccountsToDeleteService = async () => {
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${baseURL}/to_delete`, config)
    return res.data
}

export const deleteAccountService = async (id) => {
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${baseURL}/${id}`, config)
    return response.data
}

export const getClientAccountsService = async (clientId = '') => {
    
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            clientId
        }
    }
    const response = await axios.get(baseURL, config)
    return response.data
}

