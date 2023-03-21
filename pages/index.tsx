import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  return (
    <main className={styles.main}>
      <Head>
        <title>Home</title>
      </Head>
    </main>
  );
};

export default Home;
