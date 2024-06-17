import * as React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const listItems = [
  {
    text: 'Dashboard',
    href: '/dashboard',
  },
  {
    text: 'Patients',
    href: '/patients',
  },
  {
    text: 'Appointments',
    href: '/appointments',
  },
  {
    text: 'Settings',
    href: '/settings',
  },
  {
    text: 'Help',
    href: '/help',
  },
];

export default function ListItems() {
  return (
    <List>
      {listItems.map((item) => (
        <ListItem key={item.text} button component={Link} href={item.href}>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
}