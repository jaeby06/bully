import {
    Grid,
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import supabase from "../Client";


  function UpdateModal({ open, onClose, inPatient, handleUpdate }) {
    const [actualDateLeftWard, setActualDateLeftWard] = useState(inPatient.actual_date_left_ward);
  
    const handleSubmit = async () => {
      await handleUpdate(inPatient.in_patient_number, actualDateLeftWard);
      onClose();
    };
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update In-Patient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to update the actual date left ward for in-patient {inPatient.in_patient_number}?
          </DialogContentText>
          <TextField
            label="Actual Date Left Ward"
            type="date"
            value={actualDateLeftWard}
            onChange={(e) => setActualDateLeftWard(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  export default UpdateModal;