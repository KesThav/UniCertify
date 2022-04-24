import React, { useState, useContext, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { ContextAPI } from "../Middlewares/ContextAPI";
import logo from "../img/logo.png";

const Landing = () => {
  const {
    setData,
    getData,
    verifyToken,
    data,
    count,
    setCount,
    alert,
    setAlert,
  } = useContext(ContextAPI);

  const [tokenid, setTokenId] = useState("");

  useEffect(() => {}, [count]);

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
          <img
            src={logo}
            style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
          />
          <Typography component="h2" variant="h2">
            Enter token
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => getData(e)}
            sx={{ width: "100%" }}
          >
            <TextField
              onChange={(e) => setTokenId(e.target.value)}
              value={tokenid}
              required
              fullWidth
              placeholder="Name"
              sx={{ marginBottom: "10px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
            >
              Verify
            </Button>
          </Box>
        </Box>
        {alert.visible && (
          <Alert severity={alert.color} fullWidth>
            <AlertTitle fullWidth>
              <strong>{alert.title}</strong>
            </AlertTitle>
            <a href={alert.text} onClick={() => setAlert(null)} target="_blank">
              {alert.text}
            </a>
          </Alert>
        )}
      </Container>
    </Fragment>
  );
};

export default Landing;
