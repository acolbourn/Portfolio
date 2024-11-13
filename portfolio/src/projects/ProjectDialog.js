import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import PdfViewer from './PdfViewer';
import ProjectWebsite from './ProjectWebsite';
import useStyles from './styles/ProjectDialogStyles';
import Youtube from './Youtube';

export default function ProjectDialog({ open, closeDetail, project }) {
  const { title, youtube, github, pdf, webLink } = project;
  const theme = useTheme();
  const classes = useStyles(webLink ? true : false);
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
