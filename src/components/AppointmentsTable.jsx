import { Container, Table, Button, TableHead, TableRow, TableCell, Grid, TableBody, Link, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import supabase from "../Client";

function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(appointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    const { data } = await supabase
      .from("appointments")
      .select("*");
    setAppointments(data);
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("appointment_number", id);
      if (error) {
        console.error(error);
      } else {
        fetchAppointments(); // fetch appointments again to update the table
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Table style={{ backgroundColor: '#a3d2f9' }}>
        <TableHead>
          <TableRow>
            <TableCell>Appointment Number</TableCell>
            <TableCell>Patient Number</TableCell>
            <TableCell>Staff Number</TableCell>
            <TableCell>Date and Time</TableCell>
            <TableCell>Examination Room</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
            <TableRow key={`row-${index}`}>
              <TableCell>{appointment.appointment_number}</TableCell>
              <TableCell>{appointment.patient_number}</TableCell>
              <TableCell>{appointment.staff_number}</TableCell>
              <TableCell>{appointment.date_and_time}</TableCell>
              <TableCell>{appointment.examination_room}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDelete(appointment.appointment_number)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(appointments.length / rowsPerPage)}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default AppointmentsTable;