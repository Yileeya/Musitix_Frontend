import { defineStore } from 'pinia'

interface TicketList {
  id: string
  headCount: number
}

export const bookingTicketStore = defineStore('bookingTicket', {
  state: () => ({
    ticketList: [] as TicketList[]
  }),
  actions: {
    setTicketList(value: TicketList[]) {
      this.ticketList = value
    }
  }
})
