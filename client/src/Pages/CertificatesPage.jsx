import React, { Fragment, useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Button, Container } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ContextAPI } from "../Middlewares/ContextAPI";

const CertificatesTemplate = (props) => {
  let { certifid } = useParams();

  const {getData,data,getUniData,uniData,loading,setLoading} = useContext(ContextAPI)
  const [d,setD] = useState(null);
  const [senderName,setSenderName] = useState(null);
  const [count,setCount] = useState(0)

  useEffect(() => {
    getData()
    !data && setCount(count => count+1)

    getUniData();
    !uniData && setCount(count => count+1);
    if(data){
      const temp = data.filter(data => data.hash == certifid)
      if(uniData){
        const d2 = temp && temp.map(d => d.sender)[0]
        const uni = uniData.filter(uni => uni.sender === d2).map(uni => uni.name ? uni.name : null)
        console.log(uni)
        if(uni){
          setSenderName(uni[0])
          setD(temp.map(item => {
            return {
            fname: item.fname,
            lname: item.lname,
            s_date: item.s_date,
            e_date: item.e_date,
            c_name: item.c_name,
            sender: uni[0] ? uni[0] : item.sender,
            expired: item.expired
          }
        }))
        }
      }
    }
  },[count])

  return (
<Fragment>
      {d && d.map(d => (
                <Fragment key={certifid}>
                    <Box
              sx={{
                bgcolor: "#EFEFEF",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: "150px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "80%",
                  maxWidth: "1400px",
                  height: "100%",
                  justiyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    src="/broken-image.jpg"
                    sx={{
                      width: 96,
                      height: 96,
                      marginRight: "20px",
                      color: "white",
                    }}
                  />
                  <Typography>
                    This certificate was issued to {d.lname + " " +d.fname} on {d.s_date} - due on {d.e_date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                </Box>
              </Box>
            </Box>
            <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row",paddingTop:"30px"}}>
              <Box sx={{marginRight: "30px",marginLeft:"-50px"}}>
                {d.expired ? <CancelIcon sx={{ width: 300, height: 300, color: "#ab003c"}}/> : <CheckCircleIcon sx={{ width: 300, height: 300, color:"#00a152" }} />  }
                
              </Box>
              <Box>
                  <Typography variant="h3">{d.c_name}</Typography><br/>
                <Typography sx={{ textAlign: "justify" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  fringilla volutpat quam in egestas. Nullam a imperdiet nunc. Aliquam
                  erat velit, malesuada nec lorem quis, feugiat dictum lorem. Sed
                  felis justo, dignissim at erat in, viverra varius orci. Vestibulum
                  id porta mauris. In pretium ultrices facilisis. Donec maximus
                  fermentum purus, sit amet faucibus justo aliquam rhoncus. Nulla nec
                  massa gravida, interdum libero a, dictum lectus. Quisque ornare
                  sollicitudin nisi eu interdum. Nam sed justo sit amet purus
                  efficitur ultricies. Vivamus porttitor tortor ac lacus semper, vel
                  vehicula mi tincidunt. Aliquam elementum viverra pharetra.
                  Pellentesque habitant morbi tristique senectus et netus et malesuada
                  fames ac turpis egestas. Nulla mattis vulputate fermentum.
                  Pellentesque tincidunt auctor pulvinar.
                </Typography>
                  <br/>
                <Typography><strong>Organization</strong> : {senderName && senderName ? senderName : d.sender}</Typography>
                <Box>
                    <Button variant="outlined" color="inherit">Lorem</Button>
                    <Button variant="outlined" color="inherit">Lorem</Button>
                    <Button variant="outlined" color="inherit">Lorem</Button>
                    <Button variant="outlined" color="inherit">Lorem</Button>
                </Box>
              </Box>
            </Container>
          </Fragment>
      ))}
</Fragment>
  );
};

export default CertificatesTemplate;
