import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';

export default function ContactError({ errorMessage }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Server Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Sorry about that, please message me directly at
            alexcolbourn@gmail.com or try again.
            <br />
            <br />
            Error Details: <br />
            {errorMessage && errorMessage.toString()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
