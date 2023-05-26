import https from '@/utils/https'
//取得我的票卷
export const getTicketRecord = async () => {
    return await https.get(`/api/users/ticket_record`)
}
//取得訂單資訊
export const getOrderInfo = async (id:string) => {
    return await https.patch(`/api/users/order_info/${id}`)
}
//取消訂單
export const deleteOrder = async (id:string) => {
    return await https.delete(`/api/users/order/${id}`)
}
