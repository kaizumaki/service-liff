import Voucher from "./Voucher"

export interface Point   {
    id: string
    amount: number
    used_at: number | null
    pointVoucher_id: string
    pointVoucher: Voucher
}
