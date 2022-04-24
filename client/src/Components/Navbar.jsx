import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: "none",maxHeight:"100px" }}>
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
                minWidth: "400px",
                justifyContent: "space-between",
              }}
            >
              <img
                src={logo}
                style={{
                  maxHeight: "20px",
                  display: "block",
                }}
              />
              <Link
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
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
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
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
                to="/"
                style={{
                  color: "black",
                  textDecoration: "none",
                  "&:hover": { color: "green", cursor: "pointer" },
                }}
              >
                <Typography
                  sx={{ "&:hover": { color: "green", cursor: "pointer" } }}
                >
                  Add certificates
                </Typography>
              </Link>
            </Box>

            <Box>
              <Button variant="text" color="primary">
                Create Account
              </Button>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
