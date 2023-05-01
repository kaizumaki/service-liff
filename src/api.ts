import { Voucher } from "@/types/Voucher"
import { User } from "@/types/User"
import { Point } from "@/types/Point"
import { OnetimeNonce } from "@/types/OnetimeNonce";
import { resolve } from "path";

class APIHandlerClass {
  rootURL: string = process.env.NEXT_PUBLIC_API_ROOT || "";
  lineIdToken: string = process.env.NEXT_PUBLIC_DEBUG_LINE_ID_TOKEN || "";
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
    if (this.myInfo) return new Promise<Response>((resolve, reject) => reject(new Error("User is already registered")))
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
      .then((res: Response) => {
        if (res.status !== 200) return new Promise<Voucher>((resolve, reject) => reject(new Error(res.statusText)))
        return res.json()
      }
    )
  }
  postVoucher: (voucherId: string) => Promise<string> = (voucherId: string) => {
    if (!this.lineIdToken) return new Promise<string>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    if (!this.myInfo) return new Promise<string>((resolve, reject) => reject(new Error("User is not registered")));
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
      .then((res: Response) => {
        if (res.status !== 200) return new Promise<string>((resolve, reject) => reject(new Error("Failed")))
        return res.text()
      }).catch((err: Error) => {
        return new Promise<string>((resolve, reject) => reject(err))
      })
  }

  getPoints: () => Promise<Point[]> = () => {
    if (!this.lineIdToken) return new Promise<Point[]>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    if (!this.myInfo) return new Promise<Point[]>((resolve, reject) => reject(new Error("User is not registered")));
    return fetch(
      this.rootURL + "pointticket", {
        method: "GET",
        headers: {
          "line-id-token": `${this.lineIdToken}`
        }
      }
    ).then(
      (res: Response) => res.json()
    )
  }

  createPointOnetimeNonce: (ids: string[]) => Promise<OnetimeNonce> = (ids: string[]) => {
    if (!this.lineIdToken) return new Promise<OnetimeNonce>((resolve, reject) => reject(new Error("Line ID Token is not set")))
    if (!this.myInfo) return new Promise<OnetimeNonce>((resolve, reject) => reject(new Error("User is not registered")));
    return fetch(
      this.rootURL + "pointticket/onetime-nonce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "line-id-token": `${this.lineIdToken}`
        },
        body: JSON.stringify({
          ids: ids
        })
      }
    ).then((res: Response) => res.json())
  }
}

const API = new APIHandlerClass()

export default API
