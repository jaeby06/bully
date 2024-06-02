import { Button, Container, Grid, Paper, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate, } from "react-router-dom";
import supabase from "../Client"

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

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errormessage, setErrorMessage] = useState('')

    const login = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setErrorMessage('Invalid Credintials');
            } else {
                window.location.href = '/Dashboard';
            }
        } catch (error) {
            setErrorMessage(error.message);
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
    return (
        <Container maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <img className={classes.logo} src='/n1.gif' alt='logo' width='50' height='50' />
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {!errormessage && (
                    <Typography className={classes.error}>
                        {errormessage}
                    </Typography>
                )}
                <form className={classes.form}>
                    <TextField label='Email' variant="outlined" fullWidth value={email} onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} />
                    <TextField label='Password' variant="outlined" fullWidth value={password} onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} />
                    <Button className={classes.submit} variant="contained" color="primary" type="submit" fullWidth onClick={login}>
                        Login
                    </Button>
                </form>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link to='/signup' className={classes.link}>
                            Don't have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}