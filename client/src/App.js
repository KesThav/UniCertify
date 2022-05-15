import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import "./App.css";
import MyCertificates from "contracts/MyCertificates.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeSheet from "./util/theme";
import { ContextAPI } from "./Middlewares/ContextAPI";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Navbar from "./Components/Navbar";
import CertificatesTemplate from "./Pages/CertificatesPage";
import crypto from "crypto";
import Dashboard from './Pages/Dashboard'

const theme = createTheme(themeSheet);

const App = (props) => {
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  const [networkId, setNetwork] = useState(null);
  const [myContract, setContract] = useState(null);
  const [data, updateData] = useState(null);
  const [alert, setAlert] = useState({
    visible: false,
    title: null,
    color: null,
    text: null,
  });

  const [students, updateStudents] = useState(null);


  const [uniData, updateUniData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    detectEthereumProvider()
      .then((result) => setWeb3(new Web3(result)))
      .catch((err) => console.log(err));

      !web3 && setCount((count) => count + 1);
      !networkId && setCount((count) => count + 1);
      !MyCertificates && setCount((count) => count + 1);

    if (web3) {
      web3.eth.requestAccounts().then((account) => setAccount(account[0]));
      web3.eth.net.getId().then((net) => setNetwork(net));
      if (networkId) {
        setContract(
          new web3.eth.Contract(
            MyCertificates.abi,
            MyCertificates.networks[networkId].address
          )
        );
      }
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0])
      })
    }
  }, [count]);


  const setData = (e, values) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (
        !values.s_date ||
        !values.e_date ||
        !values.fname ||
        !values.lname ||
        !values.c_name ||
        !values.studentid
      ) {
        setAlert({
          visible: true,
          title: "Error",
          color: "error",
          text: "Fill the form as required.",
        });
        setLoading(false);
      } else {
        setAlert({
          visible: true,
          title: "Sending data",
          color: "info",
          text: "Sending data, please wait...",
        });
        let num = Math.random()
        let hash = crypto
          .createHash("sha256")
          .update(values.fname + values.lname + num + values.s_date + values.e_date + values.studentid)
          .digest("hex");
        if (myContract) {
          myContract.methods
            .addCert(
              new Date(values.s_date).getTime(),
              new Date(values.e_date).getTime(),
              values.fname,
              values.lname,
              values.c_name,
              values.studentid,
              hash
            )
            .send({ from: account })
            .then((result) =>
              setAlert({
                visible: true,
                title: "Data sent !",
                color: "success",
                text: `Hash code : ${hash}`,
              })
            );
        }
        setLoading(false)
      }
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        color: "error",
        text: error.message,
      });
      setLoading(false)
    }
  };

  const setStudent = (e, values) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (
        !values.fname ||
        !values.lname ||
        !values.studentid
      ) {
        setAlert({
          visible: true,
          title: "Error",
          color: "error",
          text: "Fill the form as required.",
        });
        setLoading(false)
      } else {
        setAlert({
          visible: true,
          title: "Sending student",
          color: "info",
          text: "Sending student, please wait...",
        });
        if (myContract) {
          myContract.methods
            .addStudent(
              values.fname,
              values.lname,
              values.studentid
            )
            .send({ from: account })
            .then((result) =>
              setAlert({
                visible: true,
                title: "Student created !",
                color: "success",
                text: `Student created successfully !`,
              })
            );
        }
        setLoading(false)
      }
      
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        color: "error",
        text: error.message,
      });
      setLoading(false)
    }
  };

  const getData = async (e) => {
    let temp = [];
    if (web3 && myContract) {
      try {
        setLoading(true)
        let res = await myContract.methods.getCert().call();
        res &&
          res.forEach((item) => {
            temp.push({
              fname: item.fname,
              lname: item.lname,
              c_name: item.certName,
              s_date: new Date(parseInt(item.startdate)).toDateString(),
              e_date: new Date(parseInt(item.enddate)).toDateString(),
              hash: item.hash,
              sender: item.uni,
              studentid: item.studentid,
              expired: Date.parse(new Date(parseInt(item.enddate)).toDateString()) < Date.parse(new Date()) ? true : false
            });
            updateData(temp);
          });
          setLoading(false)
      } catch (error) {
        console.log(error.message);
        setLoading(false)
      }
    }
  };

  const getStudent = async (e) => {
    let temp = [];
    if (web3 && myContract) {
      try {
        setLoading(true)
        let res = await myContract.methods.getStudents().call();
        res &&
          res.forEach((item) => {
            temp.push({
              fname: item.fname,
              lname: item.lname,
              studentid : item.studentid,
              sender : item.uni
            });
            updateStudents(temp);
          });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    }
  };

  const verifyToken = (e, tokenid) => {
    e.preventDefault();
    if (data) {
      const exist = data.filter((data) => data.hash === tokenid)
      if (exist.length != 0) {
        let expired = exist.map(value=> value.expired)[0]
        console.log(exist)
        if(expired){
          setAlert({
            visible: true,
            title: "Token expired !",
            color: "error",
            text: "The token is no longer valid",
          })
        }else{
          setAlert({
          visible: true,
          title: "Token valid !",
          color: "success",
          text: (
            <a href={`http://localhost:3000/details/certificates/${tokenid}`}>
              View certificate here
            </a>
          ),
        });
        }
        
      } else {
        setAlert({
          visible: true,
          title: "Token not found",
          color: "error",
          text: null,
        });
      }
    } else {
      setAlert({
        visible: true,
        title: "Token not found",
        color: "error",
        text: null,
      });
    }
  };

  const getUniData = async () => {
    let temp = [];
    if (web3 && myContract) {
      try {
        setLoading(true);
        let res = await myContract.methods.getUniNames().call();
        res &&
          res.forEach((item) => {
            temp.push({
              sender: item.uni,
              name: item.name,
              registered: true
            });
            updateUniData(temp);
          });
        setLoading(false)
      } catch (error) {
        console.log(error.message);
        setLoading(false)
      }
    }
  }

  const setUniName = async (e,uniName) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (
        !uniName
      ) {
        setAlert({
          visible: true,
          title: "Error",
          color: "error",
          text: "Fill the form as required.",
        });
        setLoading(false)
      } else {
        setAlert({
          visible: true,
          title: "Sending uniName",
          color: "info",
          text: "Sending uniName, please wait...",
        });
        if (myContract) {
          myContract.methods
            .updateUniName(
              uniName
            )
            .send({ from: account })
            .then((result) =>
              setAlert({
                visible: true,
                title: "uniName added !",
                color: "success",
                text: `uniName added successfully !`,
              })
            );
        }
        setLoading(false)
      }
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        color: "error",
        text: error.message,
      });
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ContextAPI.Provider
        value={{
          getData,
          data,
          loading,
          setLoading,
          alert,
          setAlert,
          setData,
          verifyToken,
          account,
          getStudent,
          students,
          setStudent,
          myContract,
          getUniData,
          setUniName,
          uniData
        }}
      >
        {/*<Navbar />*/}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/details/certificates/:certifid"
            element={<CertificatesTemplate />}
          />
        </Routes>
        {/*<Footer />*/}
      </ContextAPI.Provider>
    </ThemeProvider>
  );
};

export default App;
