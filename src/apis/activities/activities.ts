import https from '@/utils/https'
import type { SearchActivityQuery } from '@/types/activity/searchActivityQuery'
import type { BookingForm } from '@/stores/bookingTicket'

//取得首頁資料(熱門/近期/即將開賣活動)
export const getActivities = async () => {
  return await https.get(`/api/activities`)
}

//搜尋活動資料
export const getSearchActivities = async (searchQuery: SearchActivityQuery) => {
  return await https.get(`/api/activities/search`, {
    params: searchQuery
  })
}

//取得單一活動內容
export const getActivity = async (id: string) => {
  return await https.get(`/api/activities/${id}`)
}

//取得某活動的場次(票券)資料
export const getActivitySchedule = async (id: string) => {
  return await https.get(`/api/activities/schedule/${id}`)
}

//訂票
export const postBooking = async (activityId: string, bookingForm: BookingForm) => {
  return await https.post(`/api/activities/${activityId}/booking`, bookingForm)
}
