import React,{useContext,useEffect,useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { ContextAPI } from "../Middlewares/ContextAPI";


const CardTemplate = ({
  c_name,
  fname,
  lname,
  e_date,
  s_date,
  hash,
  sender,
  expired,
  studentid
}) => {

  const {uniData,getUniData,loading, setLoading,getStudent,students} = useContext(ContextAPI)

  const [senderName,setSenderName] = useState(null);
  const [st,setSt] = useState(null);

  useEffect(() => {
    if(uniData){
      const uni = uniData.filter(uni => uni.address === sender).map(uni => uni.name ? uni.name : null)
      if(uni){
        setSenderName(uni[0])
      }
    }
    
    if(students){
      const st = students.filter(st => st.studentid === studentid).map(st => st.studentid ? st.studentid : null)
      if(st){
        setSt(st[0])
      }
    }
  },[])

  const getColor = () => { 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
  }


  return (
    <Card sx={{ width: 375, margin: "10px 10px" }}>
      <CardMedia
        sx={{
          bgcolor: getColor(),
          padding: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Avatar
          src="/broken-image.jpg"
          sx={{
            width: 120,
            height: 120,
            marginRight: "20px",
            color: "white",
            marginTop: "50px",
            marginBottom:"-50px"
          }}
        />
      </CardMedia>
      <CardContent sx={{paddingTop : "75px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems : "center",paddingLeft: 0}}>
        <Typography gutterBottom variant="h5" component="div">
          {c_name}
        </Typography>
        <Typography>
        {st ? st : studentid}
        </Typography>

        <Chip
            label={expired ? "expired" : "valid"}
            color={expired ? "error" : "success"}
            size="small"
            avatar={expired ? <CloseIcon /> : <DoneIcon />}
            variant="outlined"
          />
          <Typography variant="body2" color="text.secondary">
          Delivered by <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {senderName ? senderName : sender}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        <Typography>
          <a
            href={`http://localhost:3000/details/certificates/${hash}`}
            style={{
              color: "black",
              textDecoration: "none",
              marginRight: "10px",
              "&:hover": { color: "green", cursor: "pointer" },
            }}
          >
            See more
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardTemplate;
