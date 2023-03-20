export interface Voucher {
  id: number
  event_name: string
  event_description: string
  event_image: string
  location: string
  location_name: string
  point_amount: number
  max_supply: number
  max_receivable_tickets: number
  received_tickets: number
  event_date: number
  expired_at: number
}