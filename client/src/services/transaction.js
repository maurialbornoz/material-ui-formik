import axios from 'axios'

const baseURL = '/api/transactions'
export const depositService = async (newObject) =>{
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${baseURL}/deposit`, newObject, config)
    return response
}

export const getTransactions = async (accountId) => {
    // console.log(accountId)
    const token = window.localStorage.getItem('token')
    const config = {
        params: {
            accountId
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(baseURL,  config)
    return response.data
}

export const transferService = async (newObject) => {
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(baseURL, newObject, config)
    return response.data
}