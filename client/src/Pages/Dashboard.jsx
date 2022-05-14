import React, { Fragment, useContext, useState,useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddCertificate from './addCertificate'
import AddStudent from './addStudent'
import { ContextAPI } from "../Middlewares/ContextAPI";
import UniDetails from "./uniDetails";

const TabsPanel = () => {
  const [value, setValue] = useState("1");


  return (
    <Fragment>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box>
        <TabContext value={value} >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList aria-label="lab API tabs example">
              <Tab label="Add student" value="1" onClick={() => setValue("1")}/>
              <Tab label="Add certificate" value="2" onClick={() => setValue("2")}/>
              <Tab label="University Details" value="3" onClick={() => setValue("3")}/>
            </TabList>
          </Box>
          <TabPanel value="1" ><AddStudent /></TabPanel>
          <TabPanel value="2"><AddCertificate/></TabPanel>
          <TabPanel value="3"><UniDetails/></TabPanel>
        </TabContext>
        </Box>
      </Box>
    </Fragment>
  );
};

export default TabsPanel;
