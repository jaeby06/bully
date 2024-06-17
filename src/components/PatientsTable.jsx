import { Button, Grid, Box, Container, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function PatientsTable() {
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState({});

    console.log(patients);

    useEffect(() => {
        fetchPatients();
    }, []);

    async function fetchPatients() {
        const { data } = await supabase
           .from("patients")
           .select("*");
        setPatients(data);
    }
    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
               .from("patients")
               .delete()
               .eq("patient_number", id);
            if (error) {
                console.error(error);
            } else {
                fetchPatients(); // fetch patients again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleOpen = (id) => {
        setOpen((prevOpen) => ({...prevOpen, [id]:!prevOpen[id] }));
    };

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Patient Number</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Telephone Number</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Sex</TableCell>
                        <TableCell>Marital Status</TableCell>
                        <TableCell>Date Registered</TableCell>
                        <TableCell>NOK ID</TableCell>
                        <TableCell>Doctor ID</TableCell>
                        <TableCell>Clinic ID</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patients.map((patient, index) => (
                        <React.Fragment key={patient.patient_number}>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => handleOpen(patient.patient_number)}
                                    >
                                        {open[patient.patient_number]? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{patient.patient_number}</TableCell>
                                <TableCell>{patient.first_name}</TableCell>
                                <TableCell>{patient.last_name}</TableCell>
                                <TableCell>{patient.address}</TableCell>
                                <TableCell>{patient.telephone_number}</TableCell>
                                <TableCell>{patient.date_of_birth}</TableCell>
                                <TableCell>{patient.sex}</TableCell>
                                <TableCell>{patient.marital_status}</TableCell>
                                <TableCell>{patient.date_registered}</TableCell>
                                <TableCell>{patient.nok_id}</TableCell>
                                <TableCell>{patient.doctor_id}</TableCell>
                                <TableCell>{patient.clinic_id}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(patient.patient_number)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                                    <Collapse in={open[patient.patient_number]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                                Patient Details
                                            </Typography>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Next of Kin:
                                            </Typography>
                                            <Table size="small" aria-label="nok">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>NOK First Name</TableCell>
                                                        <TableCell>NOK Last Name</TableCell>
                                                        <TableCell>Relationship</TableCell>
                                                        <TableCell>NOK Telephone Number</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={patient.nok_id}>
                                                        <TableCell component="th" scope="row">
                                                            {patient.nok_fname}
                                                        </TableCell>
                                                        <TableCell>{patient.nok_lname}</TableCell>
                                                        <TableCell>{patient.relationship}</TableCell>
                                                        <TableCell>{patient.nok_tnum}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Link to='/dashboard'>
                        <Button variant="contained" color="primary" type="submit">
                            Back to Dashboard
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/patients'>
                        <Button variant="contained" color="primary" type="submit">
                            Enter Patients
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/appointments'>
                        <Button variant="contained" color="primary" type="submit">
                            Go to Appointment
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
}

export default PatientsTable;