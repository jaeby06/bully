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
        non_surgical_item_no: "",
        surgical_item_no: "",
        pharmaceutical_drug_no: "",
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
                    non_surgical_item_no: "",
                    surgical_item_no: "",
                    pharmaceutical_drug_no: "",
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
          const newTotalPrice = name === "Quantity"? newValue * requisition.Unit_Price : requisition.Quantity * newValue;
          setRequisition({...requisition, [name]: newValue, Total_Price: newTotalPrice });
        } else {
          setRequisition({...requisition, [name]: value });
        }
      };

    return (
        <Container>
            <Grid item xs={12}>
                <h2>New Requisition</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Requisition ID"
                                name="Requisition_ID"
                                value={requisition.Requisition_ID}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Supplier ID"
                                name="Supplier_ID"
                                value={requisition.Supplier_ID}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ward Number"
                                name="Ward_Number"
                                value={requisition.Ward_Number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Requisition Date"
                                name="Requisition_Date"
                                value={requisition.Requisition_Date}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Non Surgical Item No"
                                name="Non_Surgical_Item_No"
                                value={requisition.Non_Surgical_Item_No}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Surgical Item No"
                                name="Surgical_Item_No"
                                value={requisition.Surgical_Item_No}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Pharmaceutical Drug No"
                                name="Pharmaceutical_Drug_No"
                                value={requisition.Pharmaceutical_Drug_No}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Item Description"
                                name="Item_Description"
                                value={requisition.Item_Description}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                name="Quantity"
                                value={requisition.Quantity}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Unit Price"
                                name="Unit_Price"
                                value={requisition.Unit_Price}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                                <TextField
                                    label="Total Price"
                                    name="Total_Price"
                                    value={requisition.Total_Price}
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
            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Link to='/dashboard'>
                        <Button variant="contained" color="primary" type="submit">
                            Back to Dashboard
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to='/rtable'>
                        <Button variant="contained" color="primary" type="submit">
                            Check Requisitions
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

export default Requisitions;