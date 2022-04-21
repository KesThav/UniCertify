import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import "./App.css";
import testContract from "contracts/MyContract.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeSheet from "./util/theme";
import { ContextAPI } from "./Middlewares/ContextAPI";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './Components/Navbar'
import Certificates from './Pages/Certificates'

const theme = createTheme(themeSheet);

const App = (props) => {
  const [web3, setWeb3] = useState(null);
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [networkId, setNetwork] = useState(null);
  const [myContract, setContract] = useState(null);
  const [data,updateData] = useState(null);
  const [alert, setAlert] = useState({
    visible: true,
    title: "Valid certificate",
    color: "success",
    text: "http://localhost:3000/certificates/examples",
  });

  useEffect(() => {
    detectEthereumProvider()
      .then((result) => setWeb3(new Web3(result)))
      .catch((err) => console.log(err));

    !web3 && setCount((count) => count + 1);
    !networkId && setCount((count) => count + 1);
    !testContract && setCount((count) => count + 1);

    if (web3) {
      web3.eth.requestAccounts().then((account) => setAccount(account[0]));
      web3.eth.net.getId().then((net) => setNetwork(net));
      if (networkId) {
        setContract(
          new web3.eth.Contract(
            testContract.abi,
            testContract.networks[networkId].address
          )
        );
      }
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

  const getData = () => {
    if (myContract) {
     myContract.methods
        .getData()
        .call()
        .then(result => console.log(result))
  };
}

  const getData2 = async () => {
    try {
      if(myContract){

     
      const res = await myContract.methods.getData().call()
      const temp =
        res &&
        res.map((data) => {
          return {
            name: data.name,
            surname: data.surname
          };
        });
      updateData(temp);
    } } catch (err) {
      console.log(err);
    }
  };

  const verifyToken = (e) => {
    e.preventDefault();
    getData();
    console.log(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <ContextAPI.Provider value={{ getData,verifyToken,data,count,setCount,alert}}>
        <Navbar/>
      <CssBaseline />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/certificates/:certifid" element={<Certificates/>} />
          </Routes>
      </ContextAPI.Provider>
    </ThemeProvider>
  );
};

export default App;
