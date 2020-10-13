import React, { useEffect, useRef, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '../styles/GraphicsMenuStyles';

export default function GraphicsMenu({
  handleGraphicsChange,
  graphics,
  currentFPS,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Disable warnings for first 5 seconds
  let disableWarnings = useRef(true);
  useEffect(() => {
    let timer1 = setTimeout(() => {
      disableWarnings.current = false;
    }, 5000);
    // Clear timeout on unmount
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const classes = useStyles();
  // Create alerts for low fps so graphics menu blinks and user can select a more appropriate setting
  let graphicsAlert = classes.normal;
  const warningLevel = 30;
  const alertLevel = 20;
  if (!disableWarnings.current) {
    if (currentFPS < warningLevel && currentFPS > alertLevel) {
      graphicsAlert = classes.warning;
    } else if (currentFPS <= alertLevel) {
      graphicsAlert = classes.alert;
    }
  }

  const handleChange = (event) => {
    handleGraphicsChange(event.target.value) // Handle graphics change in parent
    setIsExpanded(false) // Auto close menu after user selection
  }
  const handleExpand = (event, expanded) => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={classes.root}>
      <Accordion className={graphicsAlert} onChange={handleExpand} expanded={isExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={graphicsAlert} />}
          aria-controls='panel1a-content'
          id='panel1a-header'          
        >
          <Typography className={`${classes.heading} ${graphicsAlert}`}>
            Graphics
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='quality'
              name='quality'
              value={graphics}
              onChange={handleChange}
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
