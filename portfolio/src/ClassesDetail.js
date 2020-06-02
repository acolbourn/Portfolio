import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import ClassesProjects from './ClassesProjects';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '800px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '94%',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '96%',
    },
  },
  headerDivider: {
    marginTop: '11px',
  },
  desc: {
    marginTop: '16px',
    marginBottom: 0,
  },
  projectDivider: {
    marginTop: '16px',
  },
}));

export default function ClassesDetail({
  open,
  openDetail,
  closeDetail,
  codingClass,
}) {
  const classes = useStyles();
  const { description, title, projects, grade, link } = codingClass;
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
            {grade && <h5>{`Grade: ${grade}`}</h5>}
            <Typography>
              <Link href={link} target='_blank'>
                Course Website
              </Link>
            </Typography>
            <CloseIcon onClick={handleClose} />
            <Divider className={classes.headerDivider} />
            <p id='description' className={classes.desc}>
              {description}
            </p>
            {projects && <Divider className={classes.projectDivider} />}
            {projects && <ClassesProjects projects={projects} />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
