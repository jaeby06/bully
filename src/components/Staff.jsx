import { Button, Grid, TextField, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Staff() {
    const [staff, setStaff] = useState({
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
        qualifications: [],
        work_experience: [],
    });

    const [workExperience, setWorkExperience] = useState({
        organization_name: "",
        position: "",
        start_date: "",
        end_date: "",
    });

    const [qualification, setQualification] = useState({
        qualification_type: "",
        qualification_date: "",
        institution_name: "",
    });

    const handleChange = (event) => {
        setStaff({ ...staff, [event.target.name]: event.target.value });
    };

    const handleWorkExperienceChange = (event) => {
        setWorkExperience({ ...workExperience, [event.target.name]: event.target.value });
    };

    const handleQualificationChange = (event) => {
        setQualification({ ...qualification, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const staffData = {
               ...staff,
                work_experience: [workExperience],
                qualifications: [qualification],
            };
            const { data, error } = await supabase
               .from("staff")
               .insert([staffData])
               .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setStaff({
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
                    qualifications: [],
                    work_experience: [],
                });
                setWorkExperience({
                    organization_name: "",
                    position: "",
                    start_date: "",
                    end_date: "",
                });
                setQualification({
                    qualification_type: "",
                    qualification_date: "",
                    institution_name: "",
                });
                if (data) {
                    await addWorkExperience(data.id);
                    await addQualification(data.id);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addWorkExperience = async (staffId) => {
        try {
            const { data, error } = await supabase
                .from("work_experience")
                .insert([{ staff_number: staffId, ...workexperience }])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setWorkExperience({
                    organization_name: "",
                    position: "",
                    start_date: "",
                    end_date: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addQualification = async (staffId) => {
        try {
            const { data, error } = await supabase
                .from("qualifications")
                .insert([{ staff_number: staffId, ...qualification }])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setQualification({
                    qualification_type: "",
                    qualification_date: "",
                    institution_name: "",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
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
                        <Grid item xs={12}>
                            <h2>Work Experience</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Organization Name"
                                        name="organization_name"
                                        value={workExperience.organization_name}
                                        onChange={handleWorkExperienceChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Position"
                                        name="position"
                                        value={workExperience.position}
                                        onChange={handleWorkExperienceChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Start Date"
                                        name="start_date"
                                        value={workExperience.start_date}
                                        onChange={handleWorkExperienceChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="End Date"
                                        name="end_date"
                                        value={workExperience.end_date}
                                        onChange={handleWorkExperienceChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Qualifications</h2>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Qualification Type"
                                        name="qualification_type"
                                        value={qualification.qualification_type}
                                        onChange={handleQualificationChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Qualification Date"
                                        name="qualification_date"
                                        value={qualification.qualification_date}
                                        onChange={handleQualificationChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Institution Name"
                                        name="institution_name"
                                        value={qualification.institution_name}
                                        onChange={handleQualificationChange}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
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
                    <Link to='/staff'>
                        <Button variant="contained" color="primary" type="submit">
                            New Staff
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/stable'>
                        <Button variant="contained" color="primary" type="submit">
                            Check Staff
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

export default Staff;