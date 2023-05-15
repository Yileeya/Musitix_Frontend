import https from '@/utils/https'

//取得首頁資料(熱門/近期/即將開賣活動)
export const getActivities = async () => {
  return await https.get(`/api/activities`)
}
