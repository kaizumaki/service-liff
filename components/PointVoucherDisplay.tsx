import React from 'react'
import { Voucher } from "@/types/Voucher";
import {Dialog, Card, CardMedia, CardHeader, CardActions, Button, CardContent, Typography} from "@mui/material";
import dayjs from 'dayjs';

interface Prop {
  data: Voucher;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const PointVoucherDisplay = (props: Prop) => {
  const { data, onConfirm, onCancel } = props;
  const [ confirmed, setConfirmed ] = React.useState(false)
  const onClick = () => {
    setConfirmed(true)
    onConfirm()
  }
  return (
    <Dialog open={props.open}>
      <Card>
        <CardHeader title={data.event_name} subheader={`${dayjs(new Date(+data.event_date * 1000)).format("YYYY年MM月DD日 HH:mm:ss")}`} />
        {data.event_image && <CardMedia component="img" height={140} alt="イベント画像" sx={{ objectFit: "contain" }} image={data.event_image} />}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.event_description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" disabled={confirmed} onClick={onClick}>このポイントを受け取る</Button>
          <Button variant="outlined" onClick={onCancel}>キャンセル</Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}

export default PointVoucherDisplay
