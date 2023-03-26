import Voucher from "./Voucher"

export interface Point   {
    id: string
    amount: number
    used_at: number | null
    pointvoucher_id: string
    pointvoucher: Voucher
}
