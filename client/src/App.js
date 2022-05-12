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
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";
import CertificatesTemplate from "./Pages/CertificatesPage";
import Footer from "./Components/footer";
import addCertificate from "./Pages/addCertificate";
import crypto from "crypto";
import Certificateslist from "./Pages/Certificateslist";
import Login from "./Pages/login";
import Dashboard from './Pages/Dashboard'

const theme = createTheme(themeSheet);

const App = (props) => {
  const [web3, setWeb3] = useState(null);
  const [count, setCount] = useState(0);
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

  const [logged, setLogged] = useState(false);

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

  /*   const setData = (e) => {
    e.preventDefault();
    console.log(e, name, surname);
    if (myContract) {
      setAlert({ visible: true, color: "info", text: "Sending data..." });
      myContract.methods
        .addData(name, surname)
        .send({ from: account })
        .then((result) => console.log(result))
        .then((res) =>
          setAlert({ visible: true, color: "success", text: "Data sended !" })
        );
    }
  }; */

  const setData = (e, values) => {
    try {
      e.preventDefault();
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
      } else {
        setAlert({
          visible: true,
          title: "Sending data",
          color: "info",
          text: "Sending data, please wait...",
        });
        let hash = crypto
          .createHash("sha256")
          .update(values.fname + values.lname)
          .digest("hex");
        console.log(values, hash);
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
      }
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        color: "error",
        text: error.message,
      });
    }
  };

  const setStudent = (e, values) => {
    console.log(values)
    try {
      e.preventDefault();
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
      } else {
        setAlert({
          visible: true,
          title: "Sending student",
          color: "info",
          text: "Sending student, please wait...",
        });
        console.log(values);
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
      }
    } catch (error) {
      setAlert({
        visible: true,
        title: "Error",
        color: "error",
        text: error.message,
      });
    }
  };

  const getData = async (e) => {
    let temp = [];
    if (web3 && myContract) {
      try {
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
              sender: item.sender,
            });
            updateData(temp);
            console.log("ok");
          });
      } catch (error) {
        //console.log(error.message);
      }
    }
  };

  const getStudent = async (e) => {
    let temp = [];
    if (web3 && myContract) {
      try {
        let res = await myContract.methods.getStudent().call();
        res &&
          res.forEach((item) => {
            temp.push({
              fname: item.fname,
              lname: item.lname,
              studentid : item.studentid,
              address : item.address
            });
            updateStudents(temp);
            console.log("ok");
          });
      } catch (error) {
        //console.log(error.message);
      }
    }
  };

  const verifyToken = (e, tokenid) => {
    e.preventDefault();
    if (data) {
      const exist = data.filter((data) => data.hash == tokenid);
      if (exist.length != 0) {
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

  return (
    <ThemeProvider theme={theme}>
      <ContextAPI.Provider
        value={{
          getData,
          data,
          count,
          setCount,
          alert,
          setAlert,
          setData,
          logged,
          setLogged,
          verifyToken,
          account,
          getStudent,
          students,
          setStudent
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificates" element={<Certificateslist />} />
          <Route
            path="/details/certificates/:certifid"
            element={<CertificatesTemplate />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </ContextAPI.Provider>
    </ThemeProvider>
  );
};

export default App;
