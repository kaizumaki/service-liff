import React from 'react'
import { Voucher } from "@/types/Voucher";
import {Dialog, Card, CardMedia, CardHeader, CardActions, Button, CardContent, Typography} from "@mui/material";

interface Prop {
  data: Voucher;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const PointVoucherDisplay = (props: Prop) => {
  const { data, onConfirm, onCancel } = props;
  return (
    <Dialog open={props.open}>
      <Card>
        <CardHeader title={data.event_name} subheader={`${new Date(+data.event_date)}`} />
        {data.event_image && <CardMedia component="img" height={140} alt="イベント画像" sx={{ objectFit: "contain" }} image={data.event_image} />}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.event_description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={onConfirm}>このポイントを受け取る</Button>
          <Button variant="outlined" onClick={onCancel}>キャンセル</Button>
        </CardActions>
      </Card>
    </Dialog>
  )
}

export default PointVoucherDisplay
