export interface Activity {
  id?: number
  mainImageUrl: string
  title: string
  content?: string
  startDate: string
  endDate: string
  activityHref: string
  minPrice?: number
  maxPrice?: number
}
