import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleter } from "lib/rest-api";
import { getTokenFromLocalCookie } from "lib/auth";
import Router from "next/router";

export default function DeleteButton({ deleteEndpoint, reloadEndpoint, jwt }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    deleter(deleteEndpoint, jwt);
    Router.reload(reloadEndpoint);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='error'
        size='small'
        onClick={handleClickOpen}
      >
        Usuń
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Czy napewno chcesz usunąc ten rekord ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Usuwając dany rekord pozbywasz się go na stałe z bazy danych,
            upewnij się ze chcesz to zrobić
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button
            onClick={handleClose}
            variant='contained'
            color='error'
            size='small'
            autoFocus
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
