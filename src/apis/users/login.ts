import https from '@/utils/https'
//登入
export const postLogin = async (email: string, password: string) => {
    return await https.post(`/api/users/login`, { email, password })
}
//登出
export const postLogout = async () => {
    return await https.post(`/api/users/logout`)
}
//註冊
export const postRegist =  async (username:string,email:string,password:string,confirmPassword:string) =>{
    return await https.post(`/api/users/register`,{username,email,password,confirmPassword})
}
// google登入
export const getLoginWithGoogle = async (code:string) => {
    return await https.get(`/google/callback?code=${code}`);
}
