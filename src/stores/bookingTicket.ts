import { defineStore } from 'pinia'
import type { PreFilledInfo } from '@/apis/users/preFilledInfo'

interface TicketList {
  id: string
  headCount: number
}

//擴展 PreFilledInfo
type ExtendedPreFilledInfo = PreFilledInfo & {
  memo: string
}
export const bookingTicketStore = defineStore('bookingTicket', {
  state: () => ({
    ticketList: [] as TicketList[],
    buyerInfo: {} as ExtendedPreFilledInfo
  }),
  actions: {
    setTicketList(value: TicketList[]) {
      this.ticketList = value
    },
    setBuyerInfo(value: ExtendedPreFilledInfo) {
      this.buyerInfo = value
    }
  },
  getters: {
    getBookingForm: (state) => {
      return {
        ticketList: state.ticketList,
        ...state.buyerInfo
      }
    }
  }
})
