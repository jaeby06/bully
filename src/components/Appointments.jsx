import { Button, Grid, TextField, Container } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Appointments() {
    const [appointment, setAppointment] = useState({
        appointment_number: "",
        patient_number: "",
        staff_number: "",
        date_and_time: "",
        examination_room: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("appointments")
                .insert([appointment])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setAppointment({
                    appointment_number: "",
                    patient_number: "",
                    staff_number: "",
                    date_and_time: "",
                    examination_room: "",
                });
                fetchAppointments(); // fetch appointments again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setAppointment({ ...appointment, [event.target.name]: event.target.value });
    };

    return (
        <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Appointment Number"
                    name="appointment_number"
                    value={appointment.appointment_number}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Patient Number"
                    name="patient_number"
                    value={appointment.patient_number}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Staff Number"
                    name="staff_number"
                    value={appointment.staff_number}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Date and Time"
                    name="date_and_time"
                    value={appointment.date_and_time}
                    onChange={handleChange}
                    fullWidth
                    type="date"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Examination Room"
                    name="examination_room"
                    value={appointment.examination_room}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Add Appointment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Container>
      );
}

export default Appointments;