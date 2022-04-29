import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Box, Avatar, Typography, Button, Container } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

const CertificatesTemplate = (props) => {
  let { certifid } = useParams();
  return (
    <Fragment>
      <Box
        sx={{
          bgcolor: "#EFEFEF",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
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
              This certificate was issued to blabla on blablal
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
            <Button variant="contained">Verify</Button>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row",paddingTop:"30px"}}>
        <Box sx={{marginRight: "30px",marginLeft:"-50px"}}>
          <VerifiedIcon sx={{ width: 300, height: 300 }} />
        </Box>
        <Box>
            <Typography variant="h3">Certificate title</Typography><br/>
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
          <Typography><strong>Organization</strong> : Organization_name</Typography>
          <Box>
              <Button variant="outlined" color="inherit">Lorem</Button>
              <Button variant="outlined" color="inherit">Lorem</Button>
              <Button variant="outlined" color="inherit">Lorem</Button>
              <Button variant="outlined" color="inherit">Lorem</Button>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
};

export default CertificatesTemplate;
