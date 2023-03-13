import { useState } from "react";
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import QrCodeReaderButton from "@/components/QrCodeReaderButton";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const callback = (value: string | null) => {
    if (value) {
      setQrCodeValue(value);
    }
  }
  return (
    <main className={styles.main}>
      {liff && <QrCodeReaderButton liff={liff} callback={callback} />}
      {qrCodeValue && <p>{qrCodeValue}</p>}
    </main>
  );
};

export default Home;
