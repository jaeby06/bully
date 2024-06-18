import { Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../Client";

function WardsC() {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchWards();
  }, []);

  async function fetchWards() {
    const { data } = await supabase.from("wards").select("*");
    setWards(data);
  }


  return (
    <Container>
      <h1>Wards</h1>
      <Typography>Available Wards: {wards.length}</Typography>
    </Container>
  );
}

export default WardsC;