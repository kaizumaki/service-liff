import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import API from "@/src/api";
import { Alert, Collapse } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { User } from "@/types/User";

const Home: NextPage<{ liff: Liff | null; liffError: string | null, myInfo: User | null, setMyInfo: React.Dispatch<React.SetStateAction<User | null>>}> = ({
  liff,
  liffError,
  myInfo, setMyInfo
}) => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const onClick = () => {
    API.register().then((res) => {
      if (res.status === 200) {
        API.getMyInfo().then((res) => {
          setMyInfo(res);
        })
      } else {
        setError(true);
      }
    }).catch((e) => {
      setError(true);
    })
  }
  useEffect(() => {
    if (myInfo) {
      router.push("/qrcodereader");
    }
  });
  return (
    <main className={styles.main}>
      <Head>
        <title>ユーザー登録確認</title>
      </Head>
      <Collapse in={error}><Alert severity="error">ユーザー登録に失敗しました</Alert></Collapse>
      <Button variant="contained" onClick={onClick}>ユーザー登録を行う</Button>
      <Button variant="outlined" onClick={() => {liff?.closeWindow()}}>キャンセル</Button>
    </main>
  );
};

export default Home;
