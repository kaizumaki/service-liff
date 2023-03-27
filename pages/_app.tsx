import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import React, { useState, useEffect } from "react";
import API from "@/src/api";
import { User } from "@/types/User";
import { UserInfoContext } from "@/src/userInfoContext";
import { useRouter } from "next/router";
import { TransitionGroup } from "react-transition-group";
import { Alert, Collapse } from "@mui/material";

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
  const [errorMessages, setErrorMessages] = useState<Map<string, string>>(new Map<string, string>());
  const deleteErrorMessage = (messageId: string) => {
    const newErrorMessages = new Map<string, string>(errorMessages);
    if (!newErrorMessages.has(messageId)) {
      return;
    }
    newErrorMessages.delete(messageId);
    setErrorMessages(newErrorMessages);
  }
  const addErrorMessage = (message: string) => {
    const messageId = Math.random().toString(36).slice(-8);
    const newErrorMessages = new Map<string, string>(errorMessages);
    newErrorMessages.set(messageId, message);
    setErrorMessages(newErrorMessages);
    setTimeout(() => {
      deleteErrorMessage(messageId)
    }, 5000)
  }
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
                API.register().then((res) => {
                  if (res.status === 200) {
                    API.getMyInfo().then((res) => {
                      setMyInfo(res);
                    })
                  } else {
                    addErrorMessage("ユーザー登録に失敗しました");
                  }
                }).catch((err) => {
                  addErrorMessage("ユーザー登録に失敗しました");
                })
              })
            }
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
            addErrorMessage(error.toString());
          });
      });
  }, [liffObject, myInfo]);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.myInfo = myInfo;
  pageProps.setMyInfo = setMyInfo;
  return (
    <UserInfoContext.Provider value={value}>
      <TransitionGroup>
        {Array.from(errorMessages.entries()).map(([messageId, message]) => (
          <Collapse key={messageId}>
            <Alert severity="error" onClose={() => { deleteErrorMessage(messageId) }}>{message}</Alert>
          </Collapse>))}
      </TransitionGroup>
      <Component {...pageProps} />
    </UserInfoContext.Provider>
  );
}

export default MyApp;
