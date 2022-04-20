import React,{useState,useContext} from 'react'
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { ContextAPI } from "../Middlewares/ContextAPI";

const Landing = () => {

    const {setData,getData} = useContext(ContextAPI);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
  return (
    <div><Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      
      <Typography component="h1" variant="h5">
        Enter token
      </Typography>
      <Box component="form" noValidate /*onSubmit={setData}*/ sx={{ mt: 3 }}>

            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              fullWidth
              placeholder="Name"
            />
                  <Button onClick={getData} type="submit" fullWidth variant="contained" color="secondary">
        Verify
      </Button>
      </Box>

    </Box>
    {alert.visible && <Alert severity={alert.color}>{alert.text}</Alert>}
  </Container></div>
  )
}

export default Landing