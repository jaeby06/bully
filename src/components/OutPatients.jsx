import { Button, Grid, TextField, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function OutPatients() {
    const [outPatients, setOutPatients] = useState([]);
    const [outPatient, setOutPatient] = useState({
        out_patient_number: "",
        patient_number: "",
        date_and_time: "",
    });

    console.log(outPatients);

    useEffect(() => {
        fetchOutPatients();
    }, []);

    async function fetchOutPatients() {
        const { data } = await supabase
            .from("out_patients")
            .select("*");
        setOutPatients(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("out_patients")
                .insert({
                    out_patient_number: outPatient.out_patient_number,
                    patient_number: outPatient.patient_number,
                    date_and_time: outPatient.date_and_time,
                });
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setOutPatient({
                    out_patient_number: "",
                    patient_number: "",
                    date_and_time: "",
                });
                fetchOutPatients();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setOutPatient({ ...outPatient, [event.target.name]: event.target.value });
    };

    return (
        <Container>
            <Grid item xs={12}>
                <h2>New Out-Patient</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Out-Patient Number"
                                name="out_patient_number"
                                value={outPatient.out_patient_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Patient Number"
                                name="patient_number"
                                value={outPatient.patient_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date and Time"
                                name="date_and_time"
                                type="datetime-local"
                                value={outPatient.date_and_time}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Out-Patient
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
                    <Link to='/patients'>
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

export default OutPatients;