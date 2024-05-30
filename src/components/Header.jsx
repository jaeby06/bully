import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}))

export default function Header() {
    const classes = useStyles();
  return (
    <AppBar position='static'>
        <Toolbar>
            <h1 className={classes.title}>Pilapil</h1>
        </Toolbar>
    </AppBar>
  )
}
