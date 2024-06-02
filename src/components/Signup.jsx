import { Button, Container, Grid, Paper, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import supabase from "../Client";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(2)
  },
  link: {
    textDecoration: 'none'
  },
  title: {
    marginBottom: theme.spacing(4)
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2)
  }
}))

export default function Signup() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');


  const signup = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setSignupError('');
      } else {
        window.location.href = '/Login';
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };



  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (!validateEmail(e.target.value)) {
      setEmailError('Please enter valid email');
    }
    else {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 6) {
      setPasswordError('Password must be atleast 6 characters');
    }
    else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (e.target.value.length < 6) {
      setConfirmPasswordError('Password must be atleast 6 characters');
    }
    else if (e.target.value !== password) {
      setConfirmPasswordError('Password do not match');
    }
    else {
      setConfirmPasswordError('');
    }
  };
  
  return (
    <Container maxWidth='xs' backgroundcolor='primary'>
      <Paper className={classes.paper} elevation={3} >
        <img className={classes.logo} src='/n1.gif' alt='logo' width='50' height='50' />
        <Typography variant="h4" align="center" gutterBottom>
          Sign up
        </Typography>
        <form className={classes.form}>
          <TextField label='Email' variant="outlined" fullWidth value={email} onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} />
          <TextField label='Password' variant="outlined" fullWidth value={password} onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} />
          <TextField label='Confirm Password' variant="outlined" fullWidth value={confirmpassword} onChange={handleConfirmPasswordChange} error={Boolean(confirmpasswordError)} helperText={confirmpasswordError} />
            <Button className={classes.submit} variant="contained" color="primary" type="submit" fullWidth onClick={signup}>
              Sign up
            </Button>
            {
                    !signupError &&
                    <Box>
                        <Typography color="secondary">
                            {signupError}
                        </Typography>
                    </Box>
                }
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to='/login' className={classes.link}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}