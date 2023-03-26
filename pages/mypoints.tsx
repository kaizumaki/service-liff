import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import { Point } from "@/types/Point";
import API from "@/src/api";
import { UserInfoContext } from "@/src/userInfoContext";
import { Checkbox, Container, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from "@mui/material";


const MyPoints: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
    liff,
    liffError
  }) => {
    const [ myPoints, setMyPoints ] = useState<Point[] | null>(null);
    const { myInfo } = useContext(UserInfoContext);
    useEffect(() => {
        API.getPoints().then((res) => {
          setMyPoints(res)
        }).catch((err) => {
            console.log(err);
        })
    }, [myInfo]);
    return (
      <main className={styles.main}>
        <Head>
          <title>My Points</title>
        </Head>
        <Container>{
          myPoints == null ? <CircularProgress /> : 
            myPoints.length == 0 ? <p>ポイントはありません</p> :
            <List>
            {
              myPoints?.map(
                (point) => {
                  return <ListItem
                    key={point.id}
                  >
                    <ListItemAvatar>
                      <Checkbox />
                    </ListItemAvatar>
                    <ListItemText primary={`${point.pointvoucher.point_amount} ポイント - ${point.pointvoucher.event_name}`} secondary={"" + new Date(point.pointvoucher.event_date)} />
                  </ListItem>
                }
              )
            }
            </List>
          
        }</Container>
      </main>
    );
  }

export default MyPoints;
