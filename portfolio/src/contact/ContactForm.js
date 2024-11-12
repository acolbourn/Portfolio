import {
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import ContactError from './ContactError';
import ContactSuccess from './ContactSuccess';
import CopyText from './CopyText';
import useStyles from './styles/ContactFormStyles';

const initialValues = {
  NAME: '',
  EMAIL: '',
  MESSAGE: '',
};

export default function ContactForm({ submitForm, status, message }) {
  const classes = useStyles();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mailError, setMailError] = useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const smallHeight = useMediaQuery('(max-height:750px)');

  const enableSubmitButton = () => {
    if (loading) {
      setSuccess(true);
      setLoading(false);
    }
  };
  const disableSubmitButton = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
  };
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const valuesMailChimpFormat = {
        EMAIL: values.EMAIL.toString(),
        NAME: values.NAME.toString(),
        MESSAGE: values.MESSAGE.toString(),
        b_11e3807d1d0c5825bc7a2d077_249fd95a22: '', // Add honeypot field (used by MailChimp to filter out bots)
      };
      disableSubmitButton();
      setMailError(false);
      submitForm(valuesMailChimpFormat);
      setSubmitting(false);
    }, 400);
  };
  useEffect(() => {
    let mounted = true;
    if (status === 'success') {
      enableSubmitButton();
      setMailError(false);
    } else if (status === 'error') {
      enableSubmitButton();
      setMailError(true);
    } else if (status === 'sending') {
      setTimeout(() => {
        if (mounted) {
          setMailError(true);
          enableSubmitButton();
        }
      }, 8000);
    }
    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const checkAndFormatErrors = (keys, errors, touched) => {
    let errorList = {};
    keys.forEach((key) => {
      let errorStatus = {};
      if (errors[key] !== undefined && touched[key]) {
        errorStatus['isError'] = true;
        errorStatus['message'] = errors[key] || null;
      } else {
        errorStatus['isError'] = false;
        errorStatus['message'] = null;
      }
      errorList[key] = errorStatus;
    });
    return errorList;
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant='h3' gutterBottom>
            Contact Me
          </Typography>
          <div>
            <Typography variant='subtitle1'>
              You can reach me here or at:
            </Typography>
            <CopyText />
          </div>
          <Formik
            validationSchema={object({
              NAME: string().required().min(2).max(35),
              EMAIL: string().required().email().min(2).max(35),
              MESSAGE: string().required().min(2).max(2000),
            })}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => {
              const formattedErrors = checkAndFormatErrors(
                ['NAME', 'EMAIL', 'MESSAGE'],
                errors,
                touched
              );
              return (
                <Form className={classes.form}>
                  <div className={classes.formGroup}>
                    <FormGroup>
                      <Field
                        name='NAME'
                        as={TextField}
                        label='Name'
                        error={formattedErrors.NAME.isError}
                        helperText={formattedErrors.NAME.message}
                      />
                    </FormGroup>
                  </div>
                  <div className={classes.formGroup}>
                    <FormGroup>
                      <Field
                        name='EMAIL'
                        as={TextField}
                        label='Email'
                        type='email'
                        error={formattedErrors.EMAIL.isError}
                        helperText={formattedErrors.EMAIL.message}
                      />
                    </FormGroup>
                  </div>
                  <div className={classes.formGroupMessage}>
                    <FormGroup>
                      <Field
                        name='MESSAGE'
                        as={TextField}
                        label='Message'
                        multiline
                        rows={isMobile || smallHeight ? 5 : 8}
                        error={formattedErrors.MESSAGE.isError}
                        helperText={formattedErrors.MESSAGE.message}
                      />
                    </FormGroup>
                  </div>
                  <div className={classes.buttonPosition}>
                    <div className={classes.buttonWrapper}>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={buttonClassname}
                        disabled={loading}
                      >
                        Submit
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
        {status === 'success' && <ContactSuccess />}
        {mailError && <ContactError errorMessage={message} />}
      </Card>
    </div>
  );
}
