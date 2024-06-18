import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import mainLists from '../components/NavList';
import AppointmentsTable from '../components/AppointmentsTable';
import WardsTable from '../components/Wards';
import { Link } from 'react-router-dom';
import WardsC from './WardsTable';

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" open={open} sx={{ height: 90 }}>
        <Toolbar sx={{ pr: '40px', display: 'flex', justifyContent: 'pace-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Button>
          <Link to='/login'>
                    <Button color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        <Toolbar />
        {mainLists}
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, height: '100vh', overflow: 'auto',}}>
          <Container maxWidth="lg" sx={{ mt: 15, mb: 12 }}>
              <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                      <Paper sx={{ p:2, display: 'flex', flexDirection: 'column', height: 240,}}>
                      <AppointmentsTable />
                      </Paper>
                  </Grid>
                  <Grid item xs={12} md={4} lg={3}>
                      <Paper sx={{ p:2, display: 'flex', flexDirection: 'column', height: 240,}}>
                          <WardsC />
                      </Paper>
                  </Grid>
                  <Grid item xs={12}>
                      <Paper sx={{ p:2, display: 'flex', flexDirection: 'column'}}> 
                      <WardsTable />
                      </Paper>
                  </Grid>
              </Grid>
          </Container>
        </Box>
    </Box>
  );
}