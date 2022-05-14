import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container, Box, Grid, TextField, Link, Button } from "@mui/material";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { AlertTitle, Typography } from "@mui/material";

const UniDetails = () => {

    const {setUniName,getUniData,uniData,account,loading, setLoading, alert} = useContext(ContextAPI);
    const [name, setName] = useState("");
    const [nameExisted, setNameExisted] = useState(false);
    const [uniname,setuniname] = useState("")

    useEffect(() => {
      getUniData();
      if(uniData){
        const n = uniData.filter(uni => uni.address === account).map(u => u.name)[0]
        if(n){
          setNameExisted(true);
          setuniname(n)
        }
      }
    },[loading])

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
        <Typography
          variant="h3"
          sx={{ fontFamily: "Segoe UI", fontWeight: "bold" }}
        >
          {uniname ? `Registered as : ${uniname}` : "Not registered yet !"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={(e) => setUniName(e, name)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="uniname"
                label="University name"
                name="uniname"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Add university name
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
     
  </Fragment>
  )
}

export default UniDetails