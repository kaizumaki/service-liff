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
                  color: valid?"white":"disabled",
                },
              }
            }
          />
        }
      >
        <ListItemText
          primary={`${ticket.pointVoucher.point_amount} もりポ - ${ticket.pointVoucher.event_name}`}
          primaryTypographyProps={{variant: "body1", noWrap: true}}
          secondary={`有効期限: ${dayjs(new Date(ticket.pointVoucher.expired_at * 1000)).format("YYYY年MM月DD日 HH:mm:ss")}`}
          secondaryTypographyProps={{color: "primaryContentText", noWrap: true, variant: "caption"}}
        />
      </Button>
    </ListItem>
  );
};

export default PointTicketDisplay;
