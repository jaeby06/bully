import { Button, Grid, TextField, Container } from "@mui/material";
import { useEffect, useState } from "react";
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
        nok_lname: "",
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
                    nok_lname: "",
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
        <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12}>
            <h2>New Patient</h2>
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
                                type="date"
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
                                type="date"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Next of kin Last Name"
                                name="nok_lname"
                                value={patient.nok_lname}
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
        </Container>
    );
}

export default Patients;