import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import { Point } from "@/types/Point";
import API from "@/src/api";
import { UserInfoContext } from "@/src/userInfoContext";
import { Checkbox, Container, List, ListItem, ListItemAvatar, ListItemText, CircularProgress, Button } from "@mui/material";
import { OnetimeNonce } from "@/types/OnetimeNonce";
import OnetimeNonceDisplay from "@/components/OnetimeNonceQrCodeDisplay";


const MyPoints: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
  }) => {
    const [ myPoints, setMyPoints ] = useState<Map<string, Point> | null>(null);
    const [ checkedIds, setCheckedIds ] = useState<Set<string>>(new Set<string>());
    const { myInfo } = useContext(UserInfoContext);
    const [ totalPoint, setTotalPoint ] = useState<number>(0);
    const [ onetimeNonce, setOnetimeNonce ] = useState<OnetimeNonce | null>(null);
    const onChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSet = new Set<string>(checkedIds);
        newSet.add(event.target.value)
        setCheckedIds(newSet);
      } else {
        const newSet = new Set<string>(checkedIds);
        newSet.delete(event.target.value)
        setCheckedIds(newSet);
      }
    }
    useEffect(() => {
      API.getPoints().then((res) => {
        setMyPoints(new Map<string, Point>(res.filter((point) => point.used_at === null).map((point) => [point.id, point])))
      }).catch((err) => {
        console.log(err);
      })
    }, [myInfo]);
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
          <title>My Points</title>
        </Head>
        <Container>
          {
            myPoints == null ? <CircularProgress /> : 
              myPoints.size == 0 ? <p>ポイントはありません</p> : <>
              <List>
              {
                Array.from(myPoints.values()).map(
                  (point) => {
                    return <ListItem
                      key={point.id}
                    >
                      <ListItemAvatar>
                        <Checkbox onChange={onChecked} value={point.id} />
                      </ListItemAvatar>
                      <ListItemText primary={`${point.pointVoucher.point_amount} ポイント - ${point.pointVoucher.event_name}`} secondary={"" + new Date(point.pointVoucher.event_date)} />
                    </ListItem>
                  }
                )
              }
              </List>
              <Button variant="contained" disabled={totalPoint===0} onClick={onUsePoints}>ポイントを使う ({totalPoint} ポイント)</Button></>
          }
        </Container>
        {onetimeNonce && <OnetimeNonceDisplay totalPoint={totalPoint} onetimeNonce={onetimeNonce} onCancel={onCancel} open={onetimeNonce!==null} />}
      </main>
    );
  }

export default MyPoints;
