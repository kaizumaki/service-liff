import { Voucher } from "@/types/Voucher"

class APIHandlerClass {
  rootURL: string = process.env.NEXT_PUBLIC_API_ROOT || "";
  setRootURL: (newRootURL: string) => void = (newRootURL: string) => { this.rootURL = newRootURL };

  getVoucher: (voucherId: string) => Promise<Voucher> = (voucherId: string) => {
    return fetch(
      this.rootURL + `pointvoucher?id=${voucherId}`
    )
      .then((res: Response) => res.json())
  }
  postVoucher: (voucherId: string) => Promise<Voucher> = (voucherId: string) => {
    return fetch(
      this.rootURL + `pointvoucher?id=${voucherId}`, {
        method: "POST",
      }
    )
      .then((res: Response) => res.json())
  }

}

const API = new APIHandlerClass()

export default API