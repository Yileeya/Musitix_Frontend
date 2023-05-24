import type { Schedule } from '@/types/activity/schedule'

export interface ActivitySchedule {
  title: string
  sponsorName: string
  location: string
  schedule: Schedule

  [key: string]: any
}
