import React,{Fragment, useContext, useState} from 'react'
import {Container,Box,Grid,TextField,Link,Button} from '@mui/material'
import { ContextAPI } from "../Middlewares/ContextAPI";

const UserPage = (props) => {

  const {setData} = useContext(ContextAPI);

  const [allValues, setAllValues] = useState({
    fname: null,
    lname: null,
    s_date: null,
    e_date: null,
    c_name: null
 });
 const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
 }

  return (
    <Fragment>
        <Container component="main" maxWidth="xs">
        <Box component="form" noValidate onSubmit={(e) => setData(e,allValues)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  name="fname"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                type="date"
                  name="s_date"
                  required
                  fullWidth
                  id="s_date"
                  label="Start date"
                  autoFocus
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                type="date"
                  required
                  fullWidth
                  id="e_date"
                  label="End date"
                  name="e_date"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="c_name"
                  label="Certificates Name"
                  name="c_name"
                  onChange={changeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add certificates
            </Button>
          </Box>
        </Container>
    </Fragment>
  )
}

export default UserPage