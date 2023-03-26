import React from 'react'
import { OnetimeNonce } from "@/types/OnetimeNonce";
import {Dialog, Card, CardMedia, CardHeader, CardActions, Button, CardContent, Typography} from "@mui/material";
import QRCode from "react-qr-code";


interface Prop {
  totalPoint: number;
  onetimeNonce: OnetimeNonce;
  open: boolean;
  onCancel: () => void;
}

const OnetimeNonceDisplay = (props: Prop) => {
  const { totalPoint, onetimeNonce, open, onCancel } = props;
  return (
    <Dialog open={open}>
      <Card>
        <CardHeader title={`${totalPoint} ポイント`} subheader={`有効期限: ${new Date(+onetimeNonce.expired_at)}`} />
        <CardContent>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={onetimeNonce.nonce}
            viewBox={`0 0 256 256`}
          />
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={onCancel}>キャンセル</Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}

export default OnetimeNonceDisplay
