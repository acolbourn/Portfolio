import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
  Button,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { Form, Formik, Field } from 'formik';
import { object, string } from 'yup';
import ContactSuccess from './ContactSuccess';
import ContactError from './ContactError';
import CopyText from './CopyText';
import useStyles from './styles/ContactFormStyles';

const initialValues = {
  Name: '',
  Email: '',
  Message: '',
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
        MERGE0: values.Email.toString(),
        MERGE1: values.Name.toString(),
        MERGE2: values.Message.toString(),
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
              Name: string().required().min(2).max(35),
              Email: string().required().email().min(2).max(35),
              Message: string().required().min(2).max(2000),
            })}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => {
              const formattedErrors = checkAndFormatErrors(
                ['Name', 'Email', 'Message'],
                errors,
                touched
              );
              return (
                <Form className={classes.form}>
                  <div className={classes.formGroup}>
                    <FormGroup>
                      <Field
                        name='Name'
                        as={TextField}
                        label='Name'
                        error={formattedErrors.Name.isError}
                        helperText={formattedErrors.Name.message}
                      />
                    </FormGroup>
                  </div>                  
                  <div className={classes.formGroup}>
                    <FormGroup>
                      <Field
                        name='Email'
                        as={TextField}
                        label='Email'
                        type='email'
                        error={formattedErrors.Email.isError}
                        helperText={formattedErrors.Email.message}
                      />
                    </FormGroup>
                  </div>                  
                  <div className={classes.formGroupMessage}>
                    <FormGroup>
                      <Field
                        name='Message'
                        as={TextField}
                        label='Message'
                        multiline
                        rows={isMobile ? 5 : 8}
                        error={formattedErrors.Message.isError}
                        helperText={formattedErrors.Message.message}
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
