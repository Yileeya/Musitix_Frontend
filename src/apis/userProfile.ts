import https from '@/utils/https'

export const Profiles = async () => {
    return await https.get(`/api/users/profiles`)
}

