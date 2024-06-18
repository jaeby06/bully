import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

export const mainLists = (
    <List>
        <ListItem button>
        <Link to='/dashboard'>
            <ListItemText primary="Dashboard" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/appointments'>
            <ListItemText primary="New Appointment" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/inpatients'>
            <ListItemText primary="New In Patient" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/nok'>
            <ListItemText primary="New Next of kin" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/outpatients'>
            <ListItemText primary="New Out Patient" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/staff'>
            <ListItemText primary="New Staff" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/medication'>
            <ListItemText primary="New Medication" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/requisition'>
            <ListItemText primary="Requisitions" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/rtable'>
            <ListItemText primary="Requisition Table" />
        </Link>
        </ListItem> 
        <ListItem button>
        <Link to='/stable'>
            <ListItemText primary="Staff Table" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/supplytable'>
            <ListItemText primary="Supplies" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/optable'>
            <ListItemText primary="Out Patients" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/iptable'>
            <ListItemText primary="In Patients Table" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/ptable'>
            <ListItemText primary="Patients Table" />
        </Link>
        </ListItem>
        <ListItem button>
        <Link to='/mtable'>
            <ListItemText primary="Medication Table" />
        </Link>
        </ListItem>
    </List>
);
export default mainLists;