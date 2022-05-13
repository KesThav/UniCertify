import React, { useContext, useEffect, useState, Fragment } from "react";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Card from "../Components/Card";
import { Typography } from "@mui/material";

const Certificates = (props) => {
  const { getData, data } = useContext(ContextAPI);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getData();
    !data && setCount((count) => count + 1);
  }, [data, count]);
  return (
    <Fragment>
      <Typography variant="h3" sx={{fontFamily: "Segoe UI", fontWeight: "bold",margin: "10px 10px"}}>All certificates</Typography>
      <div style={{display: "flex", flexDirection: "row",flex: 1,  flexWrap: "wrap"}}>
        {data && data.lenght == 0 ? (
          <h3>Loading...</h3>
        ) : (
          data &&
          data.length != 0 &&
          data.map((item) => (
            <Card
            expired={item.expired}
              key={item.hash}
              fname={item.fname}
              lname={item.lname}
              c_name={item.c_name}
              s_date={item.s_date}
              e_date={item.e_date}
              hash={item.hash}
              sender={item.sender}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default Certificates;
