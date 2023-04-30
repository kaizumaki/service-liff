import React from 'react'
import { OnetimeNonce } from "@/types/OnetimeNonce";
import {Dialog, Card, CardHeader, CardActions, Button, CardContent, Box} from "@mui/material";
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
        <CardHeader title={`${totalPoint} もりポ`} />
        <CardContent>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={onetimeNonce.nonce}
            viewBox={`0 0 256 256`}
          />
        </CardContent>
        <CardActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onCancel}>キャンセル</Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}

export default OnetimeNonceDisplay
