import { Button, Grid, TextField, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Medication() {
  const [medications, setMedications] = useState([]);
  const [medication, setMedication] = useState({
    medication_id: "",
    patient_number: "",
    drug_number: "",
    dosage: "",
    method_of_administration: "",
    start_date: "",
    finish_date: "",
  });

  console.log(medications);

  useEffect(() => {
    fetchMedications();
  }, []);

  async function fetchMedications() {
    const { data, error } = await supabase
      .from("medication")
      .select("*");
    if (error) {
      console.error(error);
    } else {
      setMedications(data);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // Check if the date values are empty and set them to a default value if they are
        const startDate = medication.start_date || new Date();
        const finishDate = medication.finish_date || new Date();

        const { data, error } = await supabase
            .from("medication")
            .insert([
                {
                    medication_id: medication.medication_id,
                    patient_number: medication.patient_number,
                    drug_number: medication.drug_number,
                    dosage: medication.dosage,
                    method_of_administration: medication.method_of_administration,
                    start_date: startDate,
                    finish_date: finishDate
                },
            ])
            .single();

        if (error) {
            console.error(error);
        } else {
            console.log(data);
            setMedication({
                medication_id: "",
                patient_number: "",
                drug_number: "",
                dosage: "",
                method_of_administration: "",
                start_date: "",
                finish_date: "",
            });
            fetchMedications();
        }
    } catch (error) {
        console.error(error);
    }
};
  const handleChange = (event) => {
    setMedication({ ...medication, [event.target.name]: event.target.value });
  };

  return (
    <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12}>
        <h2>New Medication</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Medication ID"
                name="medication_id"
                value={medication.medication_id}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Patient Number"
                name="patient_number"
                value={medication.patient_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Drug Number"
                name="drug_number"
                value={medication.drug_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Dosage"
                name="dosage"
                value={medication.dosage}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Method of Administration"
                name="method_of_administration"
                value={medication.method_of_administration}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={medication.start_date}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Finish Date"
                name="finish_date"
                type="date"
                value={medication.finish_date}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Medication
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}

export default Medication;