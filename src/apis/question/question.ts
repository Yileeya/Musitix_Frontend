import https from '@/utils/https'
export const postQuestions = async (model:QuestionsModel) => {
  return await https.post(`/api/questions`,model)
}
export interface QuestionsModel{
  "name":string,
  "email":string,
  "type":number,
  "subject":string,
  "content":string,
}