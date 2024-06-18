import { Button, Grid, TextField, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Client";

function Requisitions() {
    const [requisitions, setRequisitions] = useState([]);
    const [requisition, setRequisition] = useState({
        requisition_id: "",
        supplier_id: "",
        ward_number: "",
        requisition_date: "",
        item_no: "",
        item_no: "",
        drug_no: "",
        item_description: "",
        quantity: "",
        unit_price: "",
        total_price: "",
    });

    console.log(requisitions);

    useEffect(() => {
        fetchRequisitions();
    }, []);

    async function fetchRequisitions() {
        const { data } = await supabase
            .from("Requisitions")
            .select("*");
        setRequisitions(data);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from("Requisitions")
                .insert([requisition])
                .single();
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setRequisition({
                    requisition_id: "",
                    supplier_id: "",
                    ward_number: "",
                    requisition_date: "",
                    item_no: "",
                    item_no: "",
                    drug_no: "",
                    item_description: "",
                    quantity: "",
                    unit_price: "",
                    total_price: "",
                });
                fetchRequisitions(); // fetch requisitions again to update the table
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "Quantity" || name === "Unit_Price") {
            const newValue = parseFloat(value);
            const newTotalPrice = name === "Quantity" ? newValue * requisition.Unit_Price : requisition.Quantity * newValue;
            setRequisition({ ...requisition, [name]: newValue, Total_Price: newTotalPrice });
        } else {
            setRequisition({ ...requisition, [name]: value });
        }
    };

    return (
        <Container maxWidth='false' style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12}>
                <h2>New Requisition</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Requisition ID"
                                name="requisition_id"
                                value={requisition.requisition_id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Supplier ID"
                                name="supplier_id"
                                value={requisition.supplier_id}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ward Number"
                                name="ward_number"
                                value={requisition.ward_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Requisition Date"
                                name="requisition_date"
                                value={requisition.requisition_date}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Non Surgical Item No"
                                name="item_no"
                                value={requisition.item_no}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Surgical Item No"
                                name="item_no"
                                value={requisition.item_no}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Pharmaceutical Drug No"
                                name="drug_no"
                                value={requisition.drug_no}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Item Description"
                                name="item_description"
                                value={requisition.item_description}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={requisition.quantity}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Unit Price"
                                name="unit_price"
                                value={requisition.unit_price}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Total Price"
                                name="total_price"
                                value={requisition.total_price}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Add Requisition
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
}

export default Requisitions;