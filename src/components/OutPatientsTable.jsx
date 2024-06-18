import { Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../Client";

function OutPatientsTable() {
  const [outPatients, setOutPatients] = useState([]);

  useEffect(() => {
    fetchOutPatients();
  }, []);

  async function fetchOutPatients() {
    const { data } = await supabase.from("out_patients").select("*");
    setOutPatients(data);
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("out_patients").delete().eq("Out_Patient_Number", id);
      if (error) {
        console.error(error);
      } else {
        fetchOutPatients(); // fetch out patients again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Out Patients</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Out Patient Number</TableCell>
            <TableCell>Patient Number</TableCell>
            <TableCell>Date and Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outPatients && outPatients.map((outPatient, index) => (
            <TableRow key={outPatient.out_patient_number}>
              <TableCell>{outPatient.out_patient_number}</TableCell>
              <TableCell>{outPatient.patient_number}</TableCell>
              <TableCell>{outPatient.date_and_time}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(outPatient.Out_Patient_Number)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default OutPatientsTable;