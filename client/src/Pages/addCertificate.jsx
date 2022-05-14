import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container, Box, Grid, TextField, Link, Button } from "@mui/material";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { AlertTitle, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AddCertificate = (props) => {
  const { setData, alert, account, getStudent, students,setAlert,count,setCount} =
    useContext(ContextAPI);

  const [allValues, setAllValues] = useState({
    fname: "",
    lname: "",
    studentid: "",
    s_date: new Date(parseInt("1990-01-01")).toDateString(),
    e_date: "2017-05-24",
    c_name: null,
  });
  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const handleSelectStudent = (e) => {
    if(students){
      const st = students.filter(student => {
        return student.studentid === e.target.value
      })
      if(st){
        st.map(i => (
          setAllValues({...allValues, studentid: i.studentid, fname: i.fname, lname: i.lname})
        ))

      }
    }
  };

  useEffect(() => {
    getStudent();
    !students && setCount(count => count+1)
    setAlert({
      visible: false,
      title: null,
      color: null,
      text: null,
    })
  }, [count]);

  return (
    <Fragment>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ width: "100vw", height: "80vh", display: "flex", width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "Segoe UI", fontWeight: "bold" }}
          >
            Add certificate
          </Typography>
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
                  onChange={e => handleSelectStudent(e)}
                  label="Student"
                  fullWidth
                  SelectProps={{
                    multiple: false,
                    value: []
                  }}
                >
                  {students &&
                    students.filter(student => student.sender === account).map((student) => (
                      <MenuItem key={student.studentid} value={student.studentid}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add certificates
            </Button>
          </Box>
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
        </Box>
      </Container>
    </Fragment>
  );
};

export default AddCertificate;