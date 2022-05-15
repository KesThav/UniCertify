import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Widget = ({data,text,color,icon}) => {
  const theme = useTheme();

  return (
    <Card sx={{height:"200px",width:"100%",margin: "10px",display:"flex",flexDirection:"row",background: color}}>
      <div style={{padding:"15px"}}>
        <Typography variant="h1" sx={{fontFamily:"lato", color:"white"}}>{data && data}</Typography>
        <Typography variant="h4" sx={{fontFamily:"lato",color:"white"}}>{text}</Typography>
      </div>
      <div style={{paddingLeft: "10px", opacity:"0.3"}}>
      {icon}
      </div>
    </Card>
  );
}

export default Widget;
