import https from '@/utils/https'
export const getNews = async () => {
  return await https.get(`/api/news`)
}
