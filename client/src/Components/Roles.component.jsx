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
  Stack
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Roles = ({ rl ,r,uniData}) => {
  const {
    roles,
    setRoles,
    getRoles,
    getUserAndRoles,
    userAndRoles,
    alert,
    setAlert,
    createRole,
    getUniName,
  } = useContext(ContextAPI);

  const [page, setPage] = useState(1);
  const [lowbound, setLowbound] = useState(0);
  const [upbound, setUpbound] = useState(5);
  const [open, setOpen] = useState(false);
  const [newrole,setNewRole] = useState("");


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
    return rl && rl.length !== 0 && rl.length / 5 > Math.round(rl.length / 5)
      ? Math.round(rl.length / 5 + 1)
      : Math.round(rl.length / 5);
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
              {[
                "User",
                "Role"
              ].map((title, index) => (
                <TableCell key={index} sx={{ color: "white" }}>
                  <b>{title}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
                {rl ? rl.map(rl => (
                <TableRow><TableCell>{rl.user}</TableCell>
                <TableCell>{rl.role}</TableCell></TableRow>))
             : (
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
        {rl && (
          <Pagination
            count={rl && pageNumber()}
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
              onSubmit={(e) => createRole(e,newrole)}
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
