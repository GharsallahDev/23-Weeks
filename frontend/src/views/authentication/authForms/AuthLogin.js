import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

import AuthSocialButtons from './AuthSocialButtons';
import { setCredentials } from '../../../store/auth/AuthSlice';

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });


        if (response.ok) {
          const data = await response.json();
          dispatch(
            setCredentials({
              user: { type: data.type, email: values.email, full_name: data.full_name },
              token: data.access_token,
            }),
          );
          // navigate('/dashboards/modern');
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          formik.setErrors({ submit: errorData.msg || 'An error occurred during login.' });
        }
      } catch (err) {
        console.error('Error during login:', err);
        formik.setErrors({ submit: 'An error occurred. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      {formik.errors.submit && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {formik.errors.submit}
        </Alert>
      )}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            name="email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>

      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>

      {subtitle}
    </form>
  );
};

export default AuthLogin;
