import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';
import Youtube from './Youtube';
import PdfViewer from './PdfViewer';
import ProjectWebsite from './ProjectWebsite';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogContent-root': {
      paddingTop: 0,
    },
    '& .MuiPaper-root': {
      maxWidth: '800px',
      width: '90%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
  title: {
    paddingBottom: 8,
  },
  dividerContainer: {
    flex: 'none',
  },
  headerDivider: {
    marginTop: '9px',
    marginBottom: '10px',
  },
  desc: {
    marginTop: '16px',
    marginBottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    cursor: 'pointer',
  },
}));

export default function ProjectDialog({ open, closeDetail, project }) {
  const theme = useTheme();
  const classes = useStyles();
  const { description, title, youtube, github, pdf, webLink } = project;
  const fullScreen =
    useMediaQuery(theme.breakpoints.down('xs')) || pdf !== null;

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

        <DialogContent className={classes.dividerContainer}>
          <Divider className={classes.headerDivider} />
        </DialogContent>
        <DialogContent>
          {youtube && <Youtube youtube={youtube} />}
          {pdf && <PdfViewer pdf={pdf} />}
          {webLink && <ProjectWebsite webLink={webLink} github={github} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
