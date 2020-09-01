import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '120px',
    zIndex: 3000,
    position: 'absolute',
    '& .MuiPaper-root': {
      backgroundColor: theme.colors.background,
      border: '1px solid',
      borderColor: theme.colors.primary,
      opacity: 0.8,
      top: '8px',
      left: '5px',
    },
    '& .MuiSvgIcon-root': {
      color: theme.colors.primary,
      width: '20px',
    },
    '& .MuiTypography-root': {
      fontFamily: theme.fonts.primary,
      color: theme.colors.primary,
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',
    },
  },
  heading: {
    fontSize: '15px',
  },
}));

export default function GraphicsMenu({ handleGraphicsChange, graphics }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>Graphics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='quality'
              name='quality'
              value={graphics}
              onChange={handleGraphicsChange}
            >
              <FormControlLabel value='high' control={<Radio />} label='High' />
              <FormControlLabel value='med' control={<Radio />} label='Med' />
              <FormControlLabel value='low' control={<Radio />} label='Low' />
              <FormControlLabel value='bad' control={<Radio />} label='Bad' />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
