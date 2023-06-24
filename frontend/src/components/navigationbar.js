import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  let navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }} color="black">
      <AppBar component="nav" color="primary" className="bg-dark" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            align="center"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Code94 Assignment
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              sx={{ color: "#fff" }}
              onClick={() => navigate("/", { replace: true })}
            >
              HOME
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav"></Box>
    </Box>
  );
}

export default NavigationBar;
