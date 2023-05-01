import axios from 'axios'
import { API_URL } from '@/utils/config'

const https = axios.create({
    baseURL: API_URL
})

https.interceptors.request.use((config) => {
    const token = localStorage.getItem("Token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

https.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default https
