import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import React, { useState, useEffect } from "react";
import API from "@/src/api";
import { User } from "@/types/User";
import { UserInfoContext } from "@/src/userInfoContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [myInfo, setMyInfo_] = useState<User | null>(null);
  const router = useRouter();
  const setMyInfo = (user: User | null) => {
    setMyInfo_(user);
    API.setMyInfo(user);
  }
  const value = {
    myInfo,
    setMyInfo,
  };
  useEffect(() => {
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
            if (!API.lineIdToken) {
              API.setLineIdToken(liff.getIDToken());
            }
            if (!API.myInfo) {
              API.getMyInfo().then((res) => {
                setMyInfo(res);
              }).catch((err) => {
                setMyInfo(null);
                router.push("/register")
              })
            }
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.myInfo = myInfo;
  pageProps.setMyInfo = setMyInfo;
  return (
    <UserInfoContext.Provider value={value}>
      <Component {...pageProps} />
    </UserInfoContext.Provider>
  );
}

export default MyApp;
