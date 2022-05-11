import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const CardTemplate = ({c_name,fname,lname,e_date,s_date,hash,sender}) => {
  return (
<Card sx={{ width: 450,margin: "10px 10px" }}>
      <CardMedia
      sx={{bgcolor:"blue",padding:0}}
      >
        <Skeleton
  sx={{ bgcolor: 'grey.900' }}
  animation="false"
  variant="rectangular"
  width={450}
  height={200}
/>
        </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {c_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delivered by <br/>{sender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
        <Typography><a href={`http://localhost:3000/details/certificates/${hash}`} style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight:"10px",
                  "&:hover": { color: "green", cursor: "pointer" },
                }}>See more</a></Typography>
      </CardContent>
    </Card>
  );
}

export default CardTemplate