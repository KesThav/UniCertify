import React, { Fragment } from "react";
import { Typography } from "@mui/material";

const footer = () => {
  return (
    <Fragment>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          width: "100vw",
          textAlign: "center",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="caption">
          Digitalization and Information Systems © Kesigan Thavarajasingam
        </Typography>
      </footer>
    </Fragment>
  );
};

export default footer;
