import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Grid from "@mui/material/Grid";

const Workspace = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <AppBar
          position='static'
          style={{
            backgroundColor: "#FFFFFF",
            color: "black",
          }}
        >
          <Toolbar>
            <Typography variant='h8' component='div' sx={{ flexGrow: 1 }}>
              T-Movie
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={9}>
        <AppBar
          position='static'
          style={{
            backgroundColor: "#000222",
            color: "white",
          }}
        >
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Workspace;
