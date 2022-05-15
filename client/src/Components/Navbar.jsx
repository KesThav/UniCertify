import React, { useContext,Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { ContextAPI } from "../Middlewares/ContextAPI";

const ButtonAppBar = (props) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{  boxShadow: "none", maxHeight: "100px", zIndex:10 }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: "black",
                //minWidth: "400px",
                justifyContent: "space-between",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  "&:hover": { color: "green", cursor: "pointer" },
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    "&:hover": { color: "green", cursor: "pointer" },
                  }}
                >
                  Verify Certificate
                </Typography>
              </Link>
              <Link
                to="/certificates"
                style={{
                  color: "black",
                  textDecoration: "none",
                  marginRight: "10px",
                  "&:hover": { color: "green", cursor: "pointer" },
                }}
              >
                <Typography
                  sx={{ "&:hover": { color: "green", cursor: "pointer" } }}
                >
                  View all certificates
                </Typography>
              </Link>
                <Link
                  to="/dashboard"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    "&:hover": { color: "green", cursor: "pointer" },
                  }}
                >
                  <Typography
                    sx={{ "&:hover": { color: "green", cursor: "pointer" } }}
                  >
                    Dashboard
                  </Typography>
                </Link>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
