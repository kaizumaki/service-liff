import React from "react";
import { Point } from "@/types/Point";
import { Button, ListItem, ListItemText, Checkbox } from "@mui/material";
import dayjs from "dayjs";


interface Props {
  ticket: Point;
  onClick: (checked: boolean, id: string) => void;
}

const PointTicketDisplay = ({ ticket, onClick }: Props) => {
  const [checked, setChecked] = React.useState(false);
  const onChecked = (target_checked: boolean) => {
    setChecked(target_checked);
    onClick(target_checked, ticket.id);
  };
  const currentTs = Math.floor(new Date().getTime() / 1000);
  const [valid, setValid] = React.useState(ticket.used_at === null && ticket.pointVoucher.expired_at > currentTs);
  return (
    <ListItem key={ticket.id}>
      <Button
        sx={{width: "100%", textAlign: "start"}}
        variant="contained"
        disabled={!valid}
        onClick={() => onChecked(!checked)}
        endIcon={
          <Checkbox
            checked={checked}
            disabled={!valid}
            sx={
              {
                '& .MuiSvgIcon-root': {
                  fontSize: 36,
                  color: "white",
                }
              }
            }
          />
        }
      >
        <ListItemText
          primary={`${ticket.pointVoucher.point_amount} もりポ - ${ticket.pointVoucher.event_name}`}
          secondary={dayjs(new Date(ticket.pointVoucher.event_date * 1000)).format("YYYY年MM月DD日 HH:mm:ss")}
          secondaryTypographyProps={{color: "primaryContentText"}}
        />
      </Button>
    </ListItem>
  );
};

export default PointTicketDisplay;
