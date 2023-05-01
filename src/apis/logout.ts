import https from '@/utils/https'

export const Logout = async () => {
    return await https.post(`/api/users/logout`)
}


