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
import { TextField, Grid, Box,Dialog,DialogTitle,DialogContent,DialogContentText} from "@mui/material";

const Dashboard2 = () => {
  const [id, setId] = useState(1);
  const { students, getStudent, loading, getUniData, uniData, getData, data,alert,account,setUniName } =
  useContext(ContextAPI);
  const [count, setCount] = useState(0);
  const [name,setName] = useState(null);
  const [newname, setNewName] = useState("")
  const [open, setOpen] = useState(false);
  const [isActive,setIsActive] = useState(1)

  useEffect(() => {
    getStudent();
    getUniData();
    getData();

    !students && setCount((count) => count + 1);
    !uniData && setCount((count) => count + 1);
    !data && setCount((count) => count + 1);

    if(uniData){
      setName(uniData.filter(u => u.sender === account).map(u => u.name)[0])
    }


  }, [count,alert]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <div
        style={{ display: "flex", flexDirection: "row", background: "#F4F5FA" }}
        id="main"
      >
        <div style={{ width: "300px" }} id="drawer">
          <List>
            <ListItem disablePadding onClick={() => setId(1)}>
              <ListItemButton>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={"Students"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => setId(2)}>
              <ListItemButton>
                <ListItemIcon>
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary={"Certificates"} />
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
          <div style={{display:"flex", width:"100%", padding: "20px",
              boxSizing: "border-box",alignItems:"center",flexDirection:"row-reverse"}}>
                <Avatar sx={{marginLeft:"10px"}} onClick={handleClickOpen}/>{name ? name : account}
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
              data={data && new Set(data.map((d) => d.sender)).size}
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
              <Student
                st={students && students}
                uniData={uniData && uniData}
                count={count}
                setCount={setCount}
              />
            )}
            {id === 2 && (
              <Certificate
                data={data && data}
                uniData={uniData && uniData}
              />
            )}
          </div>
        </div>
      </div>

            {/** dialog to update the name*/}
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
                <Button onClick={handleClose} variant="text" color="inherit">Cancel</Button>
                <Button type="submit" variant="text" color="primary">Save</Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {console.log(newname)}
    </Fragment>
  );
};

export default Dashboard2;
