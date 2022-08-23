import axios from 'axios'
const baseURL = '/api/clients'

export const createClientService = async (newObject) => {
    
    const response = await axios.post(baseURL, newObject)
    return response.data
}

export const getClientsService = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export const updateClientService = async (newObject) => {
    const token = window.localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(baseURL, newObject, config)
    return response.data
}