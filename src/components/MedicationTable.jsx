import { Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../Client";

function MedicationTable() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    fetchMedications();
  }, []);

  async function fetchMedications() {
    const { data } = await supabase.from("medication").select("*");
    setMedications(data);
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("medication").delete().eq("medication_id", id);
      if (error) {
        console.error(error);
      } else {
        fetchMedications(); // fetch medications again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Medications</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medication ID</TableCell>
            <TableCell>Patient Number</TableCell>
            <TableCell>Drug Number</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Method of Administration</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Finish Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications && medications.map((medication, index) => (
            <TableRow key={medication.medication_id}>
              <TableCell>{medication.medication_id}</TableCell>
              <TableCell>{medication.patient_number}</TableCell>
              <TableCell>{medication.drug_number}</TableCell>
              <TableCell>{medication.dosage}</TableCell>
              <TableCell>{medication.method_of_administration}</TableCell>
              <TableCell>{medication.start_date}</TableCell>
              <TableCell>{medication.finish_date}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(medication.medication_id)}>
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

export default MedicationTable;