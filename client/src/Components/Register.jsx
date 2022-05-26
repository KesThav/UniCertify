import React, { Fragment, useContext,useState } from "react";
import {Container,Box,Typography,TextField,Alert,AlertTitle,Button,Stack} from '@mui/material'
import { ContextAPI } from "../Middlewares/ContextAPI";


const Register = () => {

    
    const {setUniName} = useContext(ContextAPI);
    const [name,setName] = useState(null);

  return (
    <Fragment>
      <div
        style={{
          zIndex: -1,
          width: "100vw",
          height: "100vh",
          background: "#F4F5FA"
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
            alignItems: "center",

          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "20px",
              height: "400px",
              borderRadius: "1%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "bold",
                  textAlign:"center",
                  marginBottom:"20px"
                }}
              > Hmmm....
              </Typography>
                <Typography variant="h5" sx={{textAlign:"center",marginBottom:"20px"}}>
                  It seems that you are not registered yet. Please register to get access.
                </Typography>
            </Box>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => setUniName(e, name)}
              sx={{ width: "100%" }}
            >
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                fullWidth
                placeholder="Name"
                sx={{ marginBottom: "10px"}}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Register
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

export default Register;
