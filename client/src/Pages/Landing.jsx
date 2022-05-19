import React, { useState, useContext, Fragment, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Stack from "@mui/material/Stack";
import Background from "../img/background.jpg";

const Landing = () => {
  const {
    setData,
    getData,
    verifyToken,
    data,
    loading,
    setLoading,
    alert,
    setAlert,
  } = useContext(ContextAPI);

  const [tokenid, setTokenId] = useState("");
  const [count,setCount] = useState(0);

  useEffect(() => {
    getData();
    !data && setCount(count => count+1)
    setAlert({
      visible: false,
      title: null,
      color: null,
      text: null,
    });

  }, [count]);

  return (
    <Fragment>
      <div
        style={{
          zIndex: -1,
          width: "100vw",
          height: "100vh",
          backgroundImage: `linear-gradient(#00000033,#000000cc),url(${Background})`,
          backgroundSize: "cover",
        }}
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            height: "100%",
            alignItems:"center"
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding : "20px",
              height:"400px",
              borderRadius: '1%'
            }}
          >
            <Box sx={{ width: "100%"}}>
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "bold",
                  color:"white"
                }}
              >
                Unicertify.
              </Typography>
              <Box
                sx={{
                  textAlign: "right",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <Typography variant="h4" sx={{color:"white"}}>
                  The best place to verify students' token.
                </Typography>
              </Box>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => verifyToken(e, tokenid)}
              sx={{ width: "100%" }}
            >
              <TextField
                onChange={(e) => setTokenId(e.target.value)}
                value={tokenid}
                required
                fullWidth
                placeholder="Name"
                sx={{ marginBottom: "10px",bgcolor:"white" }}
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
      </div>
    </Fragment>
  );
};

export default Landing;
