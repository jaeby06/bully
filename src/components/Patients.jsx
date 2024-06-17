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
    const [nok, setNok] = useState({
        first_name: "",
        last_name: "",
        address: "",
        telephone_number: "",
        relationship: "",
    });
    
    console.log(nok);

    const handleChangeNok = (event) => {
        setNok({ ...nok, [event.target.name]: event.target.value });
    };

    const handleSubmitNok = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("noks")
                .insert([nok])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setNok({
                    first_name: "",
                    last_name: "",
                    address: "",
                    telephone_number: "",
                    relationship: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

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

    return (
        <Container>
             <Grid item xs={12}>
                <form onSubmit={handleSubmitNok}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK First Name"
                                name="first_name"
                                value={nok.first_name}
                                onChange={handleChangeNok}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK Last Name"
                                name="last_name"
                                value={nok.last_name}
                                onChange={handleChangeNok}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK Address"
                                name="address"
                                value={nok.address}
                                onChange={handleChangeNok}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK Telephone Number"
                                name="telephone_number"
                                value={nok.telephone_number}
                                onChange={handleChangeNok}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NOK Relationship"
                                name="relationship"
                                value={nok.relationship}
                                onChange={handleChangeNok}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add NOK
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
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
                    <Link to='/ptable'>
                        <Button variant="contained" color="primary" type="submit">
                            Check Patients
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