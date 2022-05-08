import React, { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Middlewares/ContextAPI";
import Card from "../Components/Card";
import { Typography } from "@mui/material";

const Certificates = (props) => {
  const { getData, data } = useContext(ContextAPI);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getData();
    !data && setCount((count) => count + 1);
  }, [count]);
  return (
    <div>
      <Typography variant="h3">All certificates</Typography>
      {data.leng ? (
        <h3>Loading...</h3>
      ) : (
        data.map((item) => (
          <Card
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
  );
};

export default Certificates;
