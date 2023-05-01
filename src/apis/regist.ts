import https from '@/utils/https'

export const Regist =  async (username:string,email:string,password:string,confirmPassword:string) =>{
    return await https.post(`https://musitix-api.onrender.com/api/users/register`,{username,email,password,confirmPassword})
}
