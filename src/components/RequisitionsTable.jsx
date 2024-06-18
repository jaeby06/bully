import { Grid, Box, Container, Table, TableHead, TableRow, TableCell, TableBody, Button, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import supabase from "../Client";

function RequisitionsTable() {
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
        fetchRequisitions();
    }, []);

    async function fetchRequisitions() {
        const { data } = await supabase
           .from("Requisitions")
           .select("*");
        setRequisitions(data);
    }

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
               .from("Requisitions")
               .delete()
               .eq("Requisition_ID", id);
            if (error) {
                console.error(error);
            } else {
                fetchRequisitions(); // fetch requisitions again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Requisition ID</TableCell>
                        <TableCell>Supplier ID</TableCell>
                        <TableCell>Ward Number</TableCell>
                        <TableCell>Requisition Date</TableCell>
                        <TableCell>Non Surgical Item No</TableCell>
                        <TableCell>Surgical Item No</TableCell>
                        <TableCell>Pharmaceutical Drug No</TableCell>
                        <TableCell>Item Description</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requisitions && requisitions.map((requisition, index) => (
                        <TableRow key={requisition.requisition_id}>
                            <TableCell>{requisition.requisition_id}</TableCell>
                            <TableCell>{requisition.supplier_id}</TableCell>
                            <TableCell>{requisition.ward_number}</TableCell>
                            <TableCell>{requisition.requisition_date}</TableCell>
                            <TableCell>{requisition.non_surgical_item_no}</TableCell>
                            <TableCell>{requisition.surgical_item_no}</TableCell>
                            <TableCell>{requisition.pharmaceutical_drug_no}</TableCell>
                            <TableCell>{requisition.item_description}</TableCell>
                            <TableCell>{requisition.quantity}</TableCell>
                            <TableCell>{requisition.unit_price}</TableCell>
                            <TableCell>{requisition.total_price}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => handleDelete(requisition.Requisition_ID)}>
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
                    <Link to='/requisitions'>
                        <Button variant="contained" color="primary" type="submit">
                            New Requisition
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

export default RequisitionsTable;