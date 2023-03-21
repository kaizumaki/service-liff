import { Voucher } from "@/types/Voucher"
import { User } from "@/types/User"

class APIHandlerClass {
  rootURL: string = process.env.NEXT_PUBLIC_API_ROOT || "";
  lineIdToken: string = "";
  myInfo: User | null = null;
  setRootURL: (newRootURL: string) => void = (newRootURL: string) => { this.rootURL = newRootURL };
  setLineIdToken: (newLineIdToken: string | null) => void = (newLineIdToken: string | null) => { this.lineIdToken = newLineIdToken?newLineIdToken:"" };
  setMyInfo: (newMyInfo: User | null) => void = (newMyInfo: User | null) => { this.myInfo = newMyInfo };

  getMyInfo: () => Promise<User> = () => {
    if (!this.lineIdToken) return new Promise<User>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    return fetch(
      this.rootURL + "user/me", {
        headers: {
          "line-id-token": `${this.lineIdToken}`
        }
      }
    )
      .then((res: Response) => res.json())
  }

  register: () => Promise<Response> = () => {
    if (!this.lineIdToken) return new Promise<Response>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    return fetch(
      this.rootURL + "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "line-id-token": `${this.lineIdToken}`
        },
        body: JSON.stringify({})
      }
    )
  }

  getVoucher: (voucherId: string) => Promise<Voucher> = (voucherId: string) => {
    return fetch(
      this.rootURL + `pointvoucher?id=${voucherId}`
    )
      .then((res: Response) => res.json())
  }
  postVoucher: (voucherId: string) => Promise<Voucher> = (voucherId: string) => {
    if (!this.lineIdToken) return new Promise<User>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    return fetch(
      this.rootURL + "pointvoucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "line-id-token": `${this.lineIdToken}`
        },
        body: JSON.stringify({
          id: voucherId
        })
      }
    )
      .then((res: Response) => res.json())
  }

}

const API = new APIHandlerClass()

export default API