import {
  TableContainer,
  Paper,
  TableCell,
  Table,
  TableRow,
  TableHead,
  TableBody,
  Pagination,
  Button,
  Typography,
  Tooltip
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import MenuItem from "@mui/material/MenuItem";
import TagIcon from "@mui/icons-material/Tag";

const CertificateComp = ({ data, uniData }) => {
  const {
    setData,
    alert,
    account,
    getStudent,
    students,
    setAlert,
    loading,
    setLoading,
  } = useContext(ContextAPI);

  const [allValues, setAllValues] = useState({
    fname: "",
    lname: "",
    studentid: "",
    s_date: new Date().toISOString().split('T')[0],
    e_date: "2100-01-01",
    c_name: null,
  });

  const [page, setPage] = useState(1);
  const [lowbound, setLowbound] = useState(0);
  const [upbound, setUpbound] = useState(5);
  const [open, setOpen] = useState(false);

  const pageNumber = () => {
    return data &&
      data.length !== 0 &&
      data.length / 5 > Math.round(data.length / 5)
      ? Math.round(data.length / 5 + 1)
      : Math.round(data.length / 5);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setLowbound(value * 5 - 5);
    setUpbound(value * 5);
  };

  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const handleSelectStudent = (e) => {
    if (students) {
      const st = students.filter((student) => {
        return student.studentid === e.target.value;
      });
      if (st) {
        st.map((i) =>
          setAllValues({
            ...allValues,
            studentid: i.studentid,
            fname: i.fname,
            lname: i.lname,
          })
        );
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setAlert({
      visible: false,
      title: null,
      color: null,
      text: null,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  //join both table
  if (data && uniData) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < uniData.length; j++) {
        if (data[j].sender === uniData[j].sender) {
          data[j].sender = uniData[j].name;
        }
      }
    }
  }

  return (
    <Fragment>
      <Typography variant="h3" sx={{ fontFamily: "lato, sans-serif" }}>
        Certificates
      </Typography>
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
          Add Certificate
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{bgcolor:"#37304A"}}>
              {[
                "First name",
                "Last name",
                "Studentid",
                "Certificate name",
                "Issue date",
                "Due date",
                "Status",
                "University",
                "Action",
              ].map((title, index) => (
                <TableCell key={index} sx={{color:"white"}}>
                  <b>{title}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.slice(lowbound, upbound).map((student, index) => (
                  <TableRow key={index} sx={{background: index % 2 && "#F5F5F5", '&:hover':{background:"#F5F5F5"}}}>
                    <TableCell>{student.fname}</TableCell>
                    <TableCell>{student.lname}</TableCell>
                    <TableCell>{student.studentid}</TableCell>
                    <TableCell>{student.c_name}</TableCell>
                    <TableCell>{student.s_date}</TableCell>
                    <TableCell>{student.e_date}</TableCell>
                    <TableCell sx={{color: !student.expired ? "#00a152" : "#ab003c"}}>
                    {student.expired ? "✗ Expired" : "✓ Active"}
                    </TableCell>
                    <TableCell>{student.sender}</TableCell>
                    <TableCell>
                    <Tooltip title="Click to copy token">
                      <TagIcon
                        sx={{ marginRight: "5px" }}
                        onClick={() => {
                          navigator.clipboard.writeText(student && student.hash);
                        }}
                      />
                      </Tooltip>
                      <EditIcon sx={{ marginRight: "5px" }} />
                      <DeleteIcon sx={{ marginRight: "5px" }} />
                    </TableCell>
                  </TableRow>
                ))
              : "No data found"}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        {data && (
          <Pagination
            count={data && pageNumber()}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </div>

      {/*modal for adding students*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to add new certificate.
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
              onSubmit={(e) => setData(e, allValues)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    id="student"
                    select
                    value={allValues.studentid}
                    onChange={(e) => handleSelectStudent(e)}
                    label="Student"
                    fullWidth
                  >
                    {students &&
                      students
                        .filter((student) => student.sender === account)
                        .map((student) => (
                          <MenuItem
                            key={student.studentid}
                            value={student.studentid}
                          >
                            {student.studentid}
                          </MenuItem>
                        ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    onChange={changeHandler}
                    value={allValues.fname}
                    disabled
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
                    value={allValues.lname}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    name="s_date"
                    required
                    fullWidth
                    id="s_date"
                    label="Start date"
                    autoFocus
                    onChange={changeHandler}
                    defaultValue={allValues.s_date}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    required
                    fullWidth
                    id="e_date"
                    label="End date"
                    name="e_date"
                    onChange={changeHandler}
                    defaultValue={allValues.e_date}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="c_name"
                    label="Certificates Name"
                    name="c_name"
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
                <Button type="submit" variant="text" color="primary">Add Certificate</Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CertificateComp;
