import { Container, Paper, Typography, Button} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Dashboard() {
    return (
        <Container>
            <Paper>
                <Typography variant="h4" align="center">
                    Dashboard
                </Typography>
                <img src='/n1.gif' alt='logo' width={800} height={600} />
                <Link to='/login'>
                    <Button variant="contained" color="secondary" type="submit" fullWidth>
                        Logout
                    </Button>
                </Link>
            </Paper>
        </Container>
    )
}