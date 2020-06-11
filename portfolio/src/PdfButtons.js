import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
}));

export default function PdfButtons({ pageNumber, numPages, prev, next }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant='contained'
        color='primary'
        aria-label='contained primary button group'
      >
        <Button onClick={prev} disabled={pageNumber === 1}>
          <NavigateBeforeIcon />
        </Button>
        <Button disabled={true}>{`${pageNumber} of ${numPages}`}</Button>
        <Button onClick={next} disabled={pageNumber === numPages}>
          <NavigateNextIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
