import { useEffect, useState } from "react";
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import PointVoucherDisplay from "@/components/PointVoucherDisplay";
import API from "@/src/api";
import { Voucher } from "@/types/Voucher";
import { CircularProgress, TextField } from "@mui/material"
import { enqueueSnackbar } from "notistack";



const QrCodeReader: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [pointVoucherData, setPointVoucherData] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idValue, setIdValue] = useState("");

  const showInvalidIdError = () => {
    enqueueSnackbar("無効なQRコードです", { variant: "error" })
    setTimeout(() => {liff?.closeWindow()}, 5000)
  }
  const showPostFailedError = () => {
    enqueueSnackbar("ポイントの受け取りに失敗しました", { variant: "error" })
    setTimeout(() => {liff?.closeWindow()}, 5000)
  }
  const onGetIdCallback = (value: string | null) => {
    setIdValue(value || "");
    setIsLoading(true);
    if (value) {
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
        enqueueSnackbar("ポイントを受け取りました！", { variant: "success" })
        onDone();
      }).catch(
        (err) => {
          setPointVoucherData(null);
          showPostFailedError();
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
  useEffect(() => {
    if (liff) {
      liff.ready.then(() => {
        try {
          liff.scanCodeV2().then((value) => {
            onGetIdCallback(value.value)
          }).catch((err) => {
          })
        } catch {
          showPostFailedError();
        }
      })
    }
  }, [liff])
  
  return (
    <main className={styles.main}>
      <Head>
        <title>QR Code Reader</title>
      </Head>
      {process.env.NEXT_PUBLIC_DEBUG_LINE_ID_TOKEN && <TextField label="ID" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {onGetIdCallback(event.target.value);}} />}
      {isLoading && <CircularProgress />}
      {pointVoucherData && <PointVoucherDisplay open={!!pointVoucherData} data={pointVoucherData} onConfirm={onConfirm} onCancel={onCancel} />}
    </main>
  );
};

export default QrCodeReader;
