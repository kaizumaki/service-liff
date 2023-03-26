import { useState } from "react";
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import QrCodeReaderButton from "@/components/QrCodeReaderButton";
import PointVoucherDisplay from "@/components/PointVoucherDisplay";
import API from "@/src/api";
import { Voucher } from "@/types/Voucher";
import { TextField, CircularProgress, Alert, Collapse } from "@mui/material"
import { useContext } from "react";
import { UserInfoContext } from "@/src/userInfoContext";



const QrCodeReader: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [pointVoucherData, setPointVoucherData] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [postFailed, setPostFailed] = useState(false);
  const [done, setDone] = useState(false);

  const showInvalidIdError = () => {
    setIsInvalid(true);
    setTimeout(() => {setIsInvalid(false)}, 5000)
  }
  const showPostFailedError = () => {
    setPostFailed(true);
    setTimeout(() => {setPostFailed(false)}, 5000)
  }
  const onGetIdCallback = (value: string | null) => {
    setIdValue(value || "");
    setIsLoading(true);
    if (value) {
      setIsInvalid(false);
      API.getVoucher(value).then((res) => {
        setPointVoucherData(res);
      }).catch(
        (err) => {
          showInvalidIdError();
        }
      ).finally(() => {setIsLoading(false)});
    } else {
      showInvalidIdError();
      setPointVoucherData(null);
      setIsLoading(false);
    }
  }
  const onConfirm = () => {
    if (pointVoucherData) {
      API.postVoucher(`${pointVoucherData.id}`).then((res) => {
        setPointVoucherData(null);
        setDone(true);
        onDone();
      }).catch(
        (err) => {
          setPointVoucherData(null);
          showPostFailedError();
          console.log(err);
        }
      );
    }
  }
  const onCancel = () => {
    setPointVoucherData(null);
  }
  const onDone = () => {
    setTimeout(() => {liff?.closeWindow()}, 2000)
  }

  return (
    <main className={styles.main}>
      <Head>
        <title>QR Code Reader</title>
      </Head>
      <Collapse in={done}><Alert severity="success">ポイントを受け取りました！</Alert></Collapse> 
      <Collapse in={isInvalid}><Alert severity="error">ID が無効です</Alert></Collapse> 
      <Collapse in={postFailed}><Alert severity="error">ポイントの受け取りに失敗しました</Alert></Collapse>
      {liff && <QrCodeReaderButton liff={liff} callback={onGetIdCallback} />}
      <TextField label="直接 ID を入力する" value={idValue} onChange={(e) => onGetIdCallback(e.target.value)} />
      {isLoading && <CircularProgress />}
      {pointVoucherData && <PointVoucherDisplay open={!!pointVoucherData} data={pointVoucherData} onConfirm={onConfirm} onCancel={onCancel} />}
    </main>
  );
};

export default QrCodeReader;
