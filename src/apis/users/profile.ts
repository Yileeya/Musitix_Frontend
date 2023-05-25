import https from '@/utils/https'
//取得個人資料
export const getProfiles = async () => {
    return await https.get(`/api/users/profiles`)
}
//修改個人資料
export const patchProfiles = async (username:string,picture:string) => {
    return await https.patch(`/api/users/profiles`,{username,picture})
}

// 是否密碼存在
export const getPasswordExisted = async () => {
    return await https.get(`/api/users/pw_existed`);
}

//修改密碼
export const patchPassword = async (password:string,newPassword:string,confirmPassword:string) => {
    
    return await https.patch(`/api/users/updatePassword`,{password,newPassword,confirmPassword})
}

//上傳個人頭像
export const postUserPicture = async (file:File) => {
    let param = new FormData()
    param.append("file",file)    
    return await https.post(`/api/users/picture`,param)
}
