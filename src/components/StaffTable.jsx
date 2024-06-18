import { Button, Grid, Box, Container, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function StaffTable() {
    const [staff, setStaff] = useState([]);
    const [open, setOpen] = useState({});

    console.log(staff);

    useEffect(() => {
        fetchStaff();
    }, []);

    async function fetchStaff() {
        const { data } = await supabase
            .from("staff")
            .select("*");
        setStaff(data);
    }
    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from("staff")
                .delete()
                .eq("staff_number", id);
            if (error) {
                console.error(error);
            } else {
                fetchStaff(); // fetch staff again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpen = (id) => {
        setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
    };

    return (
        <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Staff Number</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Telephone Number</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Sex</TableCell>
                        <TableCell>NIN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {staff && staff.map((staffMember, index) => (
                        <React.Fragment key={staffMember.staff_number}>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => handleOpen(staffMember.staff_number)}
                                    >
                                        {open[staffMember.staff_number] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{staffMember.staff_number}</TableCell>
                                <TableCell>{staffMember.last_name}</TableCell>
                                <TableCell>{staffMember.first_name}</TableCell>
                                <TableCell>{staffMember.address}</TableCell>
                                <TableCell>{staffMember.telephone_number}</TableCell>
                                <TableCell>{staffMember.date_of_birth}</TableCell>
                                <TableCell>{staffMember.sex}</TableCell>
                                <TableCell>{staffMember.nin}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(staffMember.staff_number)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={17}>
                                    <Collapse in={open[staffMember.staff_number]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Staff Details
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Position Held: {staffMember.position_held}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Current Salary: {staffMember.current_salary}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Salary Scale: {staffMember.salary_scale}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Qualifications: {staffMember.qualifications}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Work Experience: {staffMember.work_experience}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Hours per Week: {staffMember.hours_per_week}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Contract Type: {staffMember.contract_type}
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Salary Payment: {staffMember.salary_payment}
                                            </Typography>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}

export default StaffTable;