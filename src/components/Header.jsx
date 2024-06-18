import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import mainLists from '../components/NavList';
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';


export default function Header() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    return (
        <Box>
            <AppBar position="absolute" open={open}>
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
                        WellMeadows Hospital
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
        </Box>
    );
}