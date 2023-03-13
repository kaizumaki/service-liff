import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@/components/Button";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <div className="container">
          <div className="row">
            <Button text="協力店舗" big bgColor="#ffbf02"/>
          </div>
          <div className="row">
            <Button text="もりポためる" />
            <Button text="エコ企画" bgColor="#02aff0"/>
            <Button text="もりポつかう" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
