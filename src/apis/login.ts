import https from '@/utils/https'

export const Login = async (email: string, password: string) => {
    return await https.post(`/api/users/login`, { email, password })
}

