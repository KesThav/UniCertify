import React, { Fragment, useState, useContext, useEffect } from "react";
import Widget from "../Components/Widget";
import Student from "../Components/student.component";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Certificate from "../Components/Certificate.component";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  TextField,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import RoleManagement from '../Components/Roles.component'
import VerifiedIcon from '@mui/icons-material/Verified';
import ProtectedRoute from "../Middlewares/ProtectedRoute";

const Dashboard = () => {
  const [id, setId] = useState(1);
  const {
    students,
    getStudent,
    loading,
    getUniData,
    uniData,
    getData,
    data,
    alert,
    account,
    setUniName,
    getRoles,
    getUsersAndRoles,
    roles,
    usersAndRoles
  } = useContext(ContextAPI);
  const [count, setCount] = useState(0);
  const [name, setName] = useState(null);
  const [newname, setNewName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getStudent();
    getUniData();
    getData();
    getUsersAndRoles();
    getRoles();

    !students && setCount((count) => count + 1);
    !uniData && setCount((count) => count + 1);
    !data && setCount((count) => count + 1);
    !usersAndRoles && setCount((count) => count + 1);
    !roles && setCount((count) => count + 1);

    if (uniData) {
      setName(
        uniData.filter((u) => u.sender === account).map((u) => u.name)[0]
      );
    }
  }, [count, alert]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (      
    <Fragment>
      <ProtectedRoute access={name && name}>
      <div
        style={{ display: "flex", flexDirection: "row", background: "#F4F5FA" }}
        id="main"
      >
        <div style={{ width: "300px" }} id="drawer">
          <List>
            <ListItem disablePadding onClick={() => setId(1)}>
              <ListItemButton>
                <ListItemIcon>
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary={"Certificates"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setId(2)}>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={"Students"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setId(3)}>
              <ListItemButton>
                <ListItemIcon>
                  <VerifiedIcon />
                </ListItemIcon>
                <ListItemText primary={"Role Management"} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
        <div
          id="content"
          style={{
            background: "#F4F5FA",
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px",
              boxSizing: "border-box",
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <Avatar sx={{ marginLeft: "10px" }} onClick={handleClickOpen} />
            {name ? name : account}
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Widget
              data={students && students.length}
              text={"Students"}
              color={"#56CA00"}
              icon={<SchoolIcon sx={{ fontSize: 300 }} />}
            />
            <Widget
              data={data && data.length}
              text={"Certificates"}
              color={"#FF4C51"}
              icon={<HowToRegIcon sx={{ fontSize: 300 }} />}
            />
            <Widget
              data={uniData && uniData.length}
              text={"Universities"}
              color={"#16B1FF"}
              icon={<HomeWorkIcon sx={{ fontSize: 300 }} />}
            />
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            {id === 1 && (
              <Certificate data={data && data} uniData={uniData && uniData} />
            )}
            {id === 2 && (
              <Student
                st={students && students}
                uniData={uniData && uniData}
                count={count}
                setCount={setCount}
              />
            )}
            {id === 3 && 
            <RoleManagement
            r={roles && roles}
            ur ={usersAndRoles && usersAndRoles} 
            uniData={uniData && uniData}/>}
          </div>
        </div>
      </div>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change your name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to change your name
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
            <Box
              component="form"
              noValidate
              onSubmit={(e) => setUniName(e, newname)}
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
                    onChange={(e) => setNewName(e.target.value)}
                    value={newname}
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
                <Button type="submit" variant="text" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      </ProtectedRoute>
    </Fragment> 
  );
};

export default Dashboard;
