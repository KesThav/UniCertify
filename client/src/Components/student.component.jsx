import {
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  TablePagination,
  Pagination
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { Grid, Box, AlertTitle } from "@mui/material";
import { ContextAPI } from "../Middlewares/ContextAPI";
import TagIcon from '@mui/icons-material/Tag';

const StudentComp = ({ st, uniData,count,setCount }) => {
  const { setStudent, alert, account, students, setAlert } =
    useContext(ContextAPI);

  const [allValues, setAllValues] = useState({
    fname: null,
    lname: null,
    studentid: null,
  });
  
  const [page, setPage] = useState(1);
  const [lowbound, setLowbound] = useState(0);
  const [upbound, setUpbound] = useState(5);
  const [open, setOpen] = React.useState(false);

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  //join both table
  if (st && uniData) {
    for (let i = 0; i < st.length; i++) {
      for (let j = 0; j < uniData.length; j++) {
        if (st[j].sender === uniData[j].sender) {
          st[j].sender = uniData[j].name;
        }
      }
    }
  }


  const handleClickOpen = () => {
    setOpen(true);
    setAlert({
      visible: false,
      title: null,
      color: null,
      text: null,
    })
  };

  const handleClose = () => {
    setOpen(false);
  };


  const pageNumber = () => {
    return st &&
      st.length !== 0 &&
      st.length / 5 > Math.round(st.length / 5)
      ? Math.round(st.length / 5 + 1)
      : Math.round(st.length / 5);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setLowbound(value * 5 - 5);
    setUpbound(value * 5);
  };


  return (
    <Fragment>
      <Typography variant="h3" sx={{fontFamily:"lato, sans-serif"}}>Students</Typography>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          variant="contained"
          sx={{ marginBottom: "20px" }}
          onClick={handleClickOpen}
          color="primary"
        >
          Add Student
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ boxShadow: "none" }}>
            <TableRow sx={{ bgcolor: "#C2C3C6" }}>
              {[
                "First name",
                "Last name",
                "Studentid",
                "University",
                "Action",
              ].map((title, index) => (
                <TableCell key={index}>
                  <b>{title}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {st ? (
              st.slice(lowbound,upbound).map((student,index) => (
                <TableRow key={index}>
                  <TableCell>{student.fname}</TableCell>
                  <TableCell>{student.lname}</TableCell>
                  <TableCell>{student.studentid}</TableCell>
                  <TableCell>{student.sender}</TableCell>
                  <TableCell>
                    <EditIcon sx={{marginRight:"5px"}}/>
                    <DeleteIcon sx={{marginRight:"5px"}}/>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="h5">No data found</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{width: "100%", marginTop:"20px",display:"flex",flexDirection:"row-reverse"}}>
      {st && (
        <Pagination
        count={st && pageNumber()}
        page={page}
        onChange={handlePageChange}
      />
      )}
      </div>

      {/*modal for adding students*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to add new student.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {alert.visible && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={alert.color}>
                  <AlertTitle>
                    <strong>{alert.title}</strong>
                  </AlertTitle>

                  {alert.text}
                </Alert>
              </Stack>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={(e) => setStudent(e, allValues)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="lname"
                    label="Last Name"
                    name="lname"
                    onChange={changeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="studentid"
                    label="Student id"
                    name="studentid"
                    onChange={changeHandler}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  marginTop: "5px",
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "100%",
                }}
              >
                <Button onClick={handleClose} variant="text" color="inherit">Cancel</Button>
                <Button type="submit" variant="text">Add student</Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default StudentComp;
