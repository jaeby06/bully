import { Button, Grid, TextField, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({
        patient_number: "",
        first_name: "",
        last_name: "",
        address: "",
        telephone_number: "",
        date_of_birth: "",
        sex: "",
        marital_status: "",
        date_registered: "",
        nok_id: "",
        doctor_id: "",
        clinic_id: "",
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("patients")
                .insert([patient])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setPatient({
                    patient_number: "",
                    first_name: "",
                    last_name: "",
                    address: "",
                    telephone_number: "",
                    date_of_birth: "",
                    sex: "",
                    marital_status: "",
                    date_registered: "",
                    nok_id: "",
                    doctor_id: "",
                    clinic_id: "",
                });
                fetchPatients(); // fetch patients again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setPatient({ ...patient, [event.target.name]: event.target.value });
    };

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

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
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
                        <TableRow key={`row-${index}`}>
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
                    ))}
                </TableBody>
            </Table>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Patient Number"
                                name="patient_number"
                                value={patient.patient_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={patient.first_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={patient.last_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                name="address"
                                value={patient.address}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Telephone Number"
                                name="telephone_number"
                                value={patient.telephone_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date of Birth"
                                name="date_of_birth"
                                value={patient.date_of_birth}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Sex"
                                name="sex"
                                value={patient.sex}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Marital Status"
                                name="marital_status"
                                value={patient.marital_status}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date Registered"
                                name="date_registered"
                                value={patient.date_registered}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK ID"
                                name="nok_id"
                                value={patient.nok_id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Doctor ID"
                                name="doctor_id"
                                value={patient.doctor_id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Clinic ID"
                                name="clinic_id"
                                value={patient.clinic_id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Patient
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Link to='/dashboard'>
                        <Button variant="contained" color="primary" type="submit">
                            Back to Dashboard
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

export default Patients;