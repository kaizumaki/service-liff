import type { Liff } from "@line/liff";
import React, {useState} from 'react'
import { Voucher } from "@/types/Voucher";

interface Prop {
  data: Voucher;
}

const PointVoucherDisplay = (props: Prop) => {
  const { data } = props;
  return (
    <div>
      <ul>
        <li>{data.event_name}</li>
        <li>{data.event_description}</li>
        <li>{data.location_name}</li>
        <li>ポイント: {data.point_amount}</li>
      </ul>
    </div>
  )
}

export default PointVoucherDisplay
