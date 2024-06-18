import { useState, useEffect } from 'react';
import { Button, Grid, TextField, Container } from "@mui/material";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Nok() {
  const [nok, setNok] = useState([]);
  const [noks, setNoks] = useState({
    nok_id: "",
    nok_fname: "",
    nok_lname: "",
    relationship: "",
    nok_tnum: "",
    address: "",
    patient_number: "",
  });

  useEffect(() => {
    fetchNOK();
  }, []);

  async function fetchNOK() {
    const { data } = await supabase
     .from("nok")
     .select("*");
    setNok(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
       .from("nok")
       .insert([{...noks }]) // Pass an array of objects
       .single();
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setNoks({
          nok_id: "",
          nok_fname: "",
          nok_lname: "",
          relationship: "",
          nok_tnum: "",
          address: "",
        });
        fetchNOK(); // fetch NOKs again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setNoks({...noks, [event.target.name]: event.target.value });
  };

  return (
    <Container>
      <Grid item xs={12}>
        <h2>New Next of Kin</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="NOK First Name"
                name="nok_fname"
                value={noks.nok_fname} // Use noks instead of nok
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NOK Last Name"
                name="nok_lname"
                value={noks.nok_lname} // Use noks instead of nok
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Relationship"
                name="relationship"
                value={noks.relationship} // Use noks instead of nok
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="NOK Telephone Number"
                name="nok_tnum"
                value={noks.nok_tnum} // Use noks instead of nok
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                name="address"
                value={noks.address} // Use noks instead of nok
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Next of Kin
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

export default Nok;