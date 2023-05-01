import https from '@/utils/https'

export const Login = async (email: string, password: string) => {
    return await https.post(`https://musitix-api.onrender.com/api/users/login`, { email, password })
}

export interface User {
    user: {
        picture: string,
        token: string,
        username: string,
    }
}
