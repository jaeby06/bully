import { Grid, Box, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import supabase from "../Client";

function SupplyTable() {
  const [pharmaceuticalSupply, setPharmaceuticalSupply] = useState([]);
  const [nonSurgicalSupply, setNonSurgicalSupply] = useState([]);
  const [surgicalSupply, setSurgicalSupply] = useState([]);

  useEffect(() => {
    fetchPharmaceuticalSupply();
    fetchNonSurgicalSupply();
    fetchSurgicalSupply();
  }, []);

  async function fetchPharmaceuticalSupply() {
    const { data } = await supabase.from("pharmaceutical_supply").select("*");
    setPharmaceuticalSupply(data);
  }

  async function fetchNonSurgicalSupply() {
    const { data } = await supabase.from("non_surgical_supply").select("*");
    setNonSurgicalSupply(data);
  }

  async function fetchSurgicalSupply() {
    const { data } = await supabase.from("surgical_supply").select("*");
    setSurgicalSupply(data);
  }

  const PShandleDelete = async (id) => {
    try {
      const { error } = await supabase.from("pharmaceutical_supply").delete().eq("drug_no", id);
      if (error) {
        console.error(error);
      } else {
        fetchPharmaceuticalSupply(); // fetch pharmaceutical supply again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  const NSPhandleDelete = async (id) => {
    try {
      const { error } = await supabase.from("non_surgical_supply").delete().eq("item_no", id);
      if (error) {
        console.error(error);
      } else {
        fetchNonSurgicalSupply(); // fetch non surgical supply again to update the table
}
    } catch (error) {
      console.error(error);
    }
  };

  const ShandleDelete = async (id) => {
    try {
      const { error } = await supabase.from("surgical_supply").delete().eq("item_no", id);
      if (error) {
        console.error(error);
      } else {
        fetchSurgicalSupply(); // fetch surgical supply again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Pharmaceutical Supply</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Drug No</TableCell>
            <TableCell>Drug Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Dosage</TableCell>
            <TableCell>Method of Administration</TableCell>
            <TableCell>Quantity in Stock</TableCell>
            <TableCell>Recorder Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pharmaceuticalSupply && pharmaceuticalSupply.map((pharmaceutical, index) => (
            <TableRow key={pharmaceutical.drug_no}>
              <TableCell>{pharmaceutical.drug_no}</TableCell>
              <TableCell>{pharmaceutical.drug_name}</TableCell>
              <TableCell>{pharmaceutical.description}</TableCell>
              <TableCell>{pharmaceutical.dosage}</TableCell>
              <TableCell>{pharmaceutical.method_of_administration}</TableCell>
              <TableCell>{pharmaceutical.quantity_in_stock}</TableCell>
              <TableCell>{pharmaceutical.recorder_level}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => PShandleDelete(pharmaceutical.drug_no)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1>Non Surgical Supply</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item No</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity in Stock</TableCell>
            <TableCell>Reorder Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nonSurgicalSupply && nonSurgicalSupply.map((nonSurgical, index) => (
            <TableRow key={nonSurgical.item_no}>
              <TableCell>{nonSurgical.item_no}</TableCell>
              <TableCell>{nonSurgical.description}</TableCell>
              <TableCell>{nonSurgical.quantity_in_stock}</TableCell>
              <TableCell>{nonSurgical.reorder_level}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => NSPhandleDelete(nonSurgical.item_no)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1>Surgical Supply</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item No</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity in Stock</TableCell>
            <TableCell>Reorder Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {surgicalSupply && surgicalSupply.map((surgical, index) => (
            <TableRow key={surgical.item_no}>
              <TableCell>{surgical.item_no}</TableCell>
              <TableCell>{surgical.item_name}</TableCell>
              <TableCell>{surgical.description}</TableCell>
              <TableCell>{surgical.quantity_in_stock}</TableCell>
              <TableCell>{surgical.reorder_level}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => ShandleDelete(surgical.item_no)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        <Grid item>
          <Link to='/dashboard'>
            <Button variant="contained" color="primary" type="submit">
              Back to Dashboard
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to='/pharmaceutical-supply'>
            <Button variant="contained" color="primary" type="submit">
              New Pharmaceutical Supply
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

export default SupplyTable;