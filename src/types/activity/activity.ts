export interface Activity {
  id: string
  mainImageUrl: string
  title: string
  startDate: string
  endDate: string
  minPrice: number
  maxPrice: number
  [key: string]: any
}
