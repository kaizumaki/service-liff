import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import { Point } from "@/types/Point";
import API from "@/src/api";
import { UserInfoContext } from "@/src/userInfoContext";
import { Container, List, CircularProgress } from "@mui/material";
import { OnetimeNonce } from "@/types/OnetimeNonce";
import OnetimeNonceDisplay from "@/components/OnetimeNonceQrCodeDisplay";
import useSWR from 'swr';
import PointTicketDisplay from "@/components/PointTicketDisplay";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { enqueueSnackbar } from "notistack";

const MyPoints: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
  }) => {
    const [ myPoints, setMyPoints ] = useState<Map<string, Point> | null>(null);
    const [ checkedIds, setCheckedIds ] = useState<Set<string>>(new Set<string>());
    const { myInfo } = useContext(UserInfoContext);
    const [ totalPoint, setTotalPoint ] = useState<number>(0);
    const [ onetimeNonce, setOnetimeNonce ] = useState<OnetimeNonce | null>(null);
    const onChecked = (checked: boolean, tickedId: string) => {
      if (checked) {
        const newSet = new Set<string>(checkedIds);
        newSet.add(tickedId)
        setCheckedIds(newSet);
      } else {
        const newSet = new Set<string>(checkedIds);
        newSet.delete(tickedId)
        setCheckedIds(newSet);
      }
    }

    const renewMyPoints = (res: Point[]) => {
      setMyPoints(
        new Map<string, Point>(
          res.sort(
            (a: Point, b: Point) => a.pointVoucher.event_date < b.pointVoucher.event_date ? 1 : -1
          ).map((point) => [point.id, point])
        )
      )
    }
    const onPointUsed = () => {
      setOnetimeNonce(null);
      enqueueSnackbar("ポイントを使用しました", { variant: "success" });
      setTimeout(() => liff?.closeWindow(), 3000);
    }
    useSWR("points", API.getPoints, {
      refreshInterval: myInfo?2000:0,
      onSuccess: (res) => {
        if (myPoints === null) {
          renewMyPoints(res);
          return
        }
        const resMap = new Map<string, Point>(res.map((point) => [point.id, point]));
        if (onetimeNonce !== null) {
          var isUsed = false;
          checkedIds.forEach((id) => {
            if (resMap.has(id) && resMap.get(id)?.used_at !== null) {
              isUsed = true;
            }
          })
          if (isUsed) {
            onPointUsed();
          }
        }
        if (Array.from(myPoints.values()).reduce((acc, point) => acc + (point.used_at === null ? 1 : 0), 0) !== res.reduce((acc, point) => acc + (point.used_at === null ? 1 : 0), 0)) {
          renewMyPoints(res);
        }
      }
    });

    useEffect(() => {
      let totalPoint = 0;
      checkedIds.forEach((id) => {
        const point = myPoints?.get(id);
        if (point) {
          totalPoint += point.pointVoucher.point_amount
        }
      })
      setTotalPoint(totalPoint);
    }, [myPoints, checkedIds]);
    const onUsePoints = () => {
      const ids = Array.from(checkedIds.values());
      API.createPointOnetimeNonce(ids).then((res) => {
        setOnetimeNonce(res);
      }).catch((err) => {
        console.log(err);
      })
    }
    const onCancel = () => {
      setOnetimeNonce(null);
    }
    return (
      <main className={styles.main}>
        <Head>
          <title>保有ポイント</title>
        </Head>
        <Header />
        <Container sx={{
          mt: "10px",
          backgroundImage: "url(/bg.png)",
          backgroundSize: "cover",
          minHeight: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          {
            myPoints == null ? <CircularProgress /> : 
            myPoints.size == 0 ? <p>ポイントはありません</p> : <>
              <List sx={{pb: 10}}>
              {
                Array.from(myPoints.values()).map(
                  (point) => {
                    return <PointTicketDisplay key={point.id} ticket={point} onClick={onChecked} />
                  }
                  )
                }
              </List>
              <Footer isSelected={checkedIds.size !== 0} totalPoint={totalPoint} onClick={onUsePoints} />
            </>
          }
        </Container>
        {onetimeNonce && <OnetimeNonceDisplay totalPoint={totalPoint} onetimeNonce={onetimeNonce} onCancel={onCancel} open={onetimeNonce!==null} />}
      </main>
    );
  }

export default MyPoints;
