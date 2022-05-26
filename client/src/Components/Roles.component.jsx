import React, { useContext, useEffect, Fragment, useState } from "react";
import { ContextAPI } from "../Middlewares/ContextAPI";
import {
  TextField,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Alert,
  AlertTitle,
  Pagination,
  Stack,
  MenuItem
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Roles = ({ ur, r, uniData }) => {
  const {
    roles,
    getRoles,
    getUsersAndRoles,
    usersAndRoles,
    alert,
    setAlert,
    createRole,
    getUniName,
    grantRole
  } = useContext(ContextAPI);

  const [page, setPage] = useState(1);
  const [lowbound, setLowbound] = useState(0);
  const [upbound, setUpbound] = useState(5);
  const [open, setOpen] = useState(false);
  const [newrole, setNewRole] = useState("");
  const [editing, setEditing] = useState(false);

  if (ur && uniData) {
    for (let i = 0; i < ur.length; i++) {
      for (let j = 0; j < uniData.length; j++) {
        if (ur[i].user === uniData[j].sender) {
          ur[i].name = uniData[j].name;
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
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pageNumber = () => {
    return ur && ur.length !== 0 && ur.length / 5 > Math.round(ur.length / 5)
      ? Math.round(ur.length / 5 + 1)
      : Math.round(ur.length / 5);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setLowbound(value * 5 - 5);
    setUpbound(value * 5);
  };

  return (
    <Fragment>
      <Typography variant="h3" sx={{ fontFamily: "lato, sans-serif" }}>
        Role Management
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
          Create Role
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ boxShadow: "none" }}>
            <TableRow sx={{ bgcolor: "#37304A" }}>
              {["User","Adress", "Role","Actions"].map((title, index) => (
                <TableCell key={index} sx={{ color: "white" }}>
                  <b>{title}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ur ? (
              ur.map((ur, index) => (
                <TableRow key={ur.user}>
                  <TableCell>{ur.name}</TableCell>
                  <TableCell>{ur.user}</TableCell>
                  <TableCell>
                    {editing ? 
                    <TextField
                    required
                    variant="standard"
                    id="student"
                    select
                    value={newrole.value}
                    onChange={(e) => setNewRole({user: ur.user, role: e.target.value})}
                    label="Role"
                    fullWidth
                  >
                    {r &&
                      r.map((r,index) => (
                          <MenuItem
                            key={index}
                            value={r}
                          >
                            {r}
                          </MenuItem>
                        ))}
                  </TextField> :
                     ur.role}</TableCell>
                  <TableCell>
                    {editing ? (
                      <Fragment>
                      <DoneIcon onClick={(e) => {
                        console.log(newrole);
                        grantRole(e,newrole);
                        setEditing(false);}}
                      />
                      <CloseIcon onClick={() => {
                        setEditing(false);
                        setNewRole(null);
                      }}/>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <EditIcon onClick={() => {
                          setEditing(true)
                          setNewRole({user: ur.user, role: ur.role})
                          console.log(newrole)}}/>
                        <DeleteIcon />
                      </Fragment>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography variant="h5">No data found</Typography>
            )}
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
        {ur && (
          <Pagination
            count={ur && pageNumber()}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </div>

      {/*modal for adding students*/}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to create new role.
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
              onSubmit={(e) => createRole(e, newrole)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="role"
                    label="role"
                    name="role"
                    onChange={(e) => setNewRole(e.target.value)}
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
                <Button onClick={handleClose} variant="text" color="inherit">
                  Cancel
                </Button>
                <Button type="submit" variant="text">
                  Create Role
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Roles;
