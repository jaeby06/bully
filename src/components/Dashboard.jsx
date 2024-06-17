import { Container, Table , Button, TableHead, TableRow, TableCell, Grid, TableBody,} from "@mui/material";
import React, { useState, useEffect } from "react";
import supabase from "../Client";
import { Link } from "react-router-dom";


export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);

    console.log(appointments);

    useEffect(() => {
        fetchAppointments();
    }, []);

    async function fetchAppointments() {
        const { data } = await supabase
            .from("appointments")
            .select("*");
        setAppointments(data);
    }

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from("appointments")
                .delete()
                .eq("appointment_number", id);
            if (error) {
                console.error(error);
            } else {
                fetchAppointments(); // fetch appointments again to update the table
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
                        <TableCell>Appointment Number</TableCell>
                        <TableCell>Patient Number</TableCell>
                        <TableCell>Staff Number</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Examination Room</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((appointment, index) => (
                        <TableRow key={`row-${index}`}>
                            <TableCell>{appointment.appointment_number}</TableCell>
                            <TableCell>{appointment.patient_number}</TableCell>
                            <TableCell>{appointment.staff_number}</TableCell>
                            <TableCell>{appointment.date_and_time}</TableCell>
                            <TableCell>{appointment.examination_room}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => handleDelete(appointment.appointment_number)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Link to='/patients'>
                        <Button variant="contained" color="primary" type="submit">
                            Enter Patients
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
                            Make Appointments
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/staff'>
                        <Button variant="contained" color="primary" type="submit">
                            New Staff
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/stable'>
                        <Button variant="contained" color="primary" type="submit">
                            Check Staffs
                        </Button>
                    </Link>
                </Grid>
            </Grid>
            </Container>
    )
}