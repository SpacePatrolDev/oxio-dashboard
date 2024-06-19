import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Dashboard
      </Typography>
      <Button component={Link} to="/table" color="inherit">
        Table
      </Button>
      <Button component={Link} to="/data-form" color="inherit">
        Add Data
      </Button>
      <Button component={Link} to="/visualization" color="inherit">
        Visualization
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
