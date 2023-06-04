import https from '@/utils/https'
export const getBanners = async () => {
  return await https.get(`/api/banner_about`)
}
