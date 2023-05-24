import type { TicketCategory } from '@/types/activity/ticketCategory'
export interface Schedule {
  scheduleName: string
  ticketCategories: TicketCategory[]
  startTime: string
  endTime: string
  saleStartTime: string
  saleEndTime: string
  _id: string
}
