import { useState } from "react";
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import QrCodeReaderButton from "@/components/QrCodeReaderButton";
import PointVoucherDisplay from "@/components/PointVoucherDisplay";
import API from "@/src/api";
import { Voucher } from "@/types/Voucher";
import { TextField, CircularProgress, Alert, Collapse } from "@mui/material"


const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [pointVoucherData, setPointVoucherData] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [idValue, setIdValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [done, setDone] = useState(false);
  const showErrorMessage = () => {
    setIsInvalid(true);
    setTimeout(() => {setIsInvalid(false)}, 5000)
  }
  const onGetIdCallback = (value: string | null) => {
    setIdValue(value || "");
    setIsLoading(true);
    if (value) {
      API.getVoucher(value).then((res) => {
        setPointVoucherData(res);
      }).catch(
        (err) => {
          showErrorMessage();
        }
      ).finally(() => {setIsLoading(false)});
    } else {
      showErrorMessage();
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
      });
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
      <Collapse in={done}><Alert severity="success">ポイントを受け取りました！</Alert></Collapse> 
      <Collapse in={isInvalid}><Alert severity="error">ID が無効です</Alert></Collapse> 
      {liff && <QrCodeReaderButton liff={liff} callback={onGetIdCallback} />}
      <TextField label="直接 ID を入力する" value={idValue} onChange={(e) => onGetIdCallback(e.target.value)} />
      {isLoading && <CircularProgress />}
      {pointVoucherData && <PointVoucherDisplay open={!!pointVoucherData} data={pointVoucherData} onConfirm={onConfirm} onCancel={onCancel} />}
    </main>
  );
};

export default Home;
