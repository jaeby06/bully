import { Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../Client";
import { Link } from "react-router-dom";

function InPatientsTable() {
  const [inPatients, setInPatients] = useState([]);

  useEffect(() => {
    fetchInPatients();
  }, []);

  async function fetchInPatients() {
    const { data } = await supabase.from("in_patients").select("*");
    setInPatients(data);
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("in_patients").delete().eq("in_patient_number", id);
      if (error) {
        console.error(error);
      } else {
        fetchInPatients(); // fetch in patients again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>In Patients</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>In Patient Number</TableCell>
            <TableCell>Patient Number</TableCell>
            <TableCell>Ward Number</TableCell>
            <TableCell>Bed Number</TableCell>
            <TableCell>Date Placed on Waiting List</TableCell>
            <TableCell>Expected Duration of Stay</TableCell>
            <TableCell>Date Placed in Ward</TableCell>
            <TableCell>Date Expected to Leave Ward</TableCell>
            <TableCell>Actual Date Left Ward</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inPatients && inPatients.map((inPatient, index) => (
            <TableRow key={inPatient.in_patient_number}>
              <TableCell>{inPatient.in_patient_number}</TableCell>
              <TableCell>{inPatient.patient_number}</TableCell>
              <TableCell>{inPatient.ward_number}</TableCell>
              <TableCell>{inPatient.bed_number}</TableCell>
              <TableCell>{inPatient.date_placed_on_waiting_list}</TableCell>
              <TableCell>{inPatient.expected_duration_of_stay}</TableCell>
              <TableCell>{inPatient.date_placed_in_ward}</TableCell>
              <TableCell>{inPatient.date_expected_to_leave_ward}</TableCell>
              <TableCell>{inPatient.actual_date_left_ward}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(inPatient.in_patient_number)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item>
          <Link to='/inpatients'>
            <Button variant="contained" color="primary" type="submit">
              New In Patient
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InPatientsTable;