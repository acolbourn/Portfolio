import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import ClassesProjects from './ClassesProjects';
import useStyles from './styles/ClassesDialogStyles';

export default function ClassesDialog({ open, closeDetail, codingClass }) {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { description, title, projects, grade, link } = codingClass;

  const handleClose = () => {
    closeDetail();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='dialog-title'
        className={classes.root}
      >
        <DialogTitle id='dialog-title' className={classes.title}>
          {title}
        </DialogTitle>
        <CloseIcon onClick={handleClose} className={classes.closeButton} />
        <DialogContent>
          {grade && (
            <DialogContentText
              className={classes.grade}
            >{`Grade: ${grade}`}</DialogContentText>
          )}
          <DialogContentText className={classes.classLink}>
            <Link href={link} target='_blank'>
              Course Website
            </Link>
          </DialogContentText>
          <Divider className={classes.headerDivider} />
          <DialogContentText>{description}</DialogContentText>
          {projects && <Divider className={classes.projectDivider} />}
          {projects && <ClassesProjects projects={projects} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
