import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import ClassesProjects from './ClassesProjects';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%',
    overflow: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ClassesDetail({
  open,
  openDetail,
  closeDetail,
  codingClass,
}) {
  const classes = useStyles();
  const { description, title, projects } = codingClass;
  //   const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    openDetail();
  };

  const handleClose = () => {
    closeDetail();
  };

  return (
    <div>
      <Modal
        aria-labelledby='title'
        aria-describedby='description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='title'>{title}</h2>
            <p id='description'>{description}</p>
            <Divider />
            <ClassesProjects projects={projects} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
