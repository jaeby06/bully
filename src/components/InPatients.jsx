import { Button, Grid, TextField, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function InPatients() {
  const [inPatients, setInPatients] = useState([]);
  const [inPatient, setInPatient] = useState({
    in_patient_number: "",
    patient_number: "",
    ward_number: "",
    bed_number: "",
    date_placed_on_waiting_list: "",
    expected_duration_of_stay: "",
    date_placed_in_ward: "",
    date_expected_to_leave_ward: "",
    actual_date_left_ward: "",
  });

  console.log(inPatients);

  useEffect(() => {
    fetchInPatients();
  }, []);

  async function fetchInPatients() {
    const { data, error } = await supabase
      .from("in_patients")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setInPatients(data);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Check if the date values are empty and set them to a default value if they are
        const datePlacedOnWaitingList = inPatient.date_placed_on_waiting_list || new Date();
        const datePlacedInWard = inPatient.date_placed_in_ward || new Date();
        const dateExpectedToLeaveWard = inPatient.date_expected_to_leave_ward || new Date();
        const actualDateLeftWard = inPatient.actual_date_left_ward || null;

        const { data, error } = await supabase
            .from("in_patients")
            .insert([
                {
                    in_patient_number: inPatient.in_patient_number,
                    patient_number: inPatient.patient_number,
                    ward_number: inPatient.ward_number,
                    bed_number: inPatient.bed_number,
                    date_placed_on_waiting_list: datePlacedOnWaitingList,
                    expected_duration_of_stay: inPatient.expected_duration_of_stay,
                    date_placed_in_ward: datePlacedInWard,
                    date_expected_to_leave_ward: dateExpectedToLeaveWard
                },
            ])
            .single();

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            setInPatient({
                in_patient_number: "",
                patient_number: "",
                ward_number: "",
                bed_number: "",
                date_placed_on_waiting_list: "",
                expected_duration_of_stay: "",
                date_placed_in_ward: "",
                date_expected_to_leave_ward: "",
                actual_date_left_ward: "",
            });
            fetchInPatients();
        }
    } catch (error) {
        console.error(error);
    }
};
  const handleChange = (event) => {
    setInPatient({ ...inPatient, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12}>
        <h2>New In-Patient</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="In-Patient Number"
                name="in_patient_number"
                value={inPatient.in_patient_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Patient Number"
                name="patient_number"
                value={inPatient.patient_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Ward Number"
                name="ward_number"
                value={inPatient.ward_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Bed Number"
                name="bed_number"
                value={inPatient.bed_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date Placed on Waiting List"
                name="date_placed_on_waiting_list"
                type="date"
                value={inPatient.date_placed_on_waiting_list}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Expected Duration of Stay"
                name="expected_duration_of_stay"
                value={inPatient.expected_duration_of_stay}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date Placed in Ward"
                name="date_placed_in_ward"
                type="date"
                value={inPatient.date_placed_in_ward}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date Expected to Leave Ward"
                name="date_expected_to_leave_ward"
                type="date"
                value={inPatient.date_expected_to_leave_ward}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add In-Patient
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default InPatients;