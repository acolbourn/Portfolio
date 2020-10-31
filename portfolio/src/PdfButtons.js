import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButtonGroup-groupedContainedPrimary:not(:last-child)': {
      borderColor: '#fff !important',
    },
  },
  pageInfo: {
    backgroundColor: `${theme.colors.fadedBlue} !important`,
    color: '#fff !important',
    borderColor: '#fff !important',
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
        <Button
          className={classes.pageInfo}
          disabled={true}
        >{`${pageNumber} of ${numPages}`}</Button>
        <Button onClick={next} disabled={pageNumber === numPages}>
          <NavigateNextIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
