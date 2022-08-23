import axios from "axios";
const baseURL = '/api/auth'

export const loginService = async (credentials) => {
    const response = await axios.post(baseURL, credentials)
    
    return response.data
}

export const getAuthenticatedUserService = async (token) => {
   
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(baseURL, config)
    return response.data
}
