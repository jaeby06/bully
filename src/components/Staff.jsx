import { Button, Grid, TextField, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Staff() {
    const [staff, setStaff] = useState([]);
    const [staffs, setStaffs] = useState({
        staff_number: "",
        last_name: "",
        first_name: "",
        address: "",
        telephone_number: "",
        date_of_birth: "",
        sex: "",
        nin: "",
        position_held: "",
        current_salary: "",
        salary_scale: "",
        qualifications: "",
        work_experience: "",
        hours_per_week: "",
        contract_type: "",
        salary_payment: "",
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    async function fetchStaff() {
        const { data } = await supabase
            .from("staff")
            .select("*");
        setStaff(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("staff")
                .insert([staffs])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setStaffs({
                    staff_number: "",
                    last_name: "",
                    first_name: "",
                    address: "",
                    telephone_number: "",
                    date_of_birth: "",
                    sex: "",
                    nin: "",
                    position_held: "",
                    current_salary: "",
                    salary_scale: "",
                    qualifications: "",
                    work_experience: "",
                    hours_per_week: "",
                    contract_type: "",
                    salary_payment: "",
                });
                fetchStaff(); // fetch staff again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setStaffs({ ...staffs, [event.target.name]: event.target.value });
    };

    return (
        <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12}>
                <h2>Staff</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Staff Number"
                                name="staff_number"
                                value={staff.staff_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                name="last_name"
                                value={staff.last_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                value={staff.first_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                name="address"
                                value={staff.address}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Telephone Number"
                                name="telephone_number"
                                value={staff.telephone_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date of Birth"
                                name="date_of_birth"
                                value={staff.date_of_birth}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Sex"
                                name="sex"
                                value={staff.sex}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="NIN"
                                name="nin"
                                value={staff.nin}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Position Held"
                                name="position_held"
                                value={staff.position_held}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Current Salary"
                                name="current_salary"
                                value={staff.current_salary}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Salary Scale"
                                name="salary_scale"
                                value={staff.salary_scale}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Qualification"
                                name="qualifications"
                                value={staff.qualifications}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Work Experience"
                                name="work_experience"
                                value={staff.work_experience}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Hours per Week"
                                name="hours_per_week"
                                value={staff.hours_per_week}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Contract Type"
                                name="contract_type"
                                value={staff.contract_type}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Salary Payment"
                                name="salary_payment"
                                value={staff.salary_payment}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
}

export default Staff;