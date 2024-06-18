import { Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../Client";

function WardsTable() {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchWards();
  }, []);

  async function fetchWards() {
    const { data } = await supabase.from("wards").select("*");
    setWards(data);
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("wards").delete().eq("ward_number", id);
      if (error) {
        console.error(error);
      } else {
        fetchWards(); // fetch wards again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>Wards</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ward Number</TableCell>
            <TableCell>Ward Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Total Beds</TableCell>
            <TableCell>Telephone Extension</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wards && wards.map((ward, index) => (
            <TableRow key={ward.ward_number}>
              <TableCell>{ward.ward_number}</TableCell>
              <TableCell>{ward.ward_name}</TableCell>
              <TableCell>{ward.location}</TableCell>
              <TableCell>{ward.total_beds}</TableCell>
              <TableCell>{ward.telephone_extension}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(ward.Ward_Number)}>
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

export default WardsTable;