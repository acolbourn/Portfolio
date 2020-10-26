import React from 'react';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

export default function AboutSkills({skills, classes, title, className, isMobile}) {
    const skillsGroup = skills.map(skill => (
        <div key={skill} className={classes.skillBox}>
            <Typography variant='body1'>
                {skill}
            </Typography> 
        </div>
    ))

    let content = (
        <div className={`${classes.gridItem} ${classes[className]}`}>
            <Typography className={classes.title} variant='h4' gutterBottom>
                {title}
            </Typography>
            <Divider variant="middle" />
            <div className={classes.content}>
                <div className={classes.skillGroupBox}>
                    {skillsGroup}
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Don't show skills on mobile devices */}
            {isMobile? null : content}
        </>
    )
}
