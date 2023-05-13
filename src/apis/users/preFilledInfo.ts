import https from '@/utils/https'
//取得個人資料
export const getPreFilledInfo = async () => {
    return await https.get(`/api/users/pre_filled_info`)
}
export const putPreFilledInfo = async (model:PreFilledInfo) => {
    return await https.put(`/api/users/pre_filled_info`,model)
}

export interface PreFilledInfo{
    "buyer":string,
    "email":string,
    "cellPhone":string,
    "address":string
}