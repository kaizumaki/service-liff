import { useState } from "react";
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import QrCodeReaderButton from "@/components/QrCodeReaderButton";
import PointVoucherDisplay from "@/components/PointVoucherDisplay";
import API from "@/src/api";
import { Voucher } from "@/types/Voucher";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [pointVoucherData, setPointVoucherData] = useState<Voucher | null>(null);
  const onGetIdCallback = (value: string | null) => {
    if (value) {
      API.getVoucher(value).then((res) => {
        setPointVoucherData(res);
      });
    }
  }
  const onConfirm = () => {
    if (pointVoucherData) {
      API.postVoucher(`${pointVoucherData.id}`).then((res) => {
        liff?.closeWindow();
      });
    }
  }

  return (
    <main className={styles.main}>
      {liff && <QrCodeReaderButton liff={liff} callback={onGetIdCallback} />}
      <input type="text" onChange={(e) => onGetIdCallback(e.target.value)} />
      {pointVoucherData && <><PointVoucherDisplay data={pointVoucherData} /><button onClick={onConfirm}>確認</button></>}
    </main>
  );
};

export default Home;
