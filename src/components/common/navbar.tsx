import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { Colors } from "../../util/colors.ts";
import logoSmall from "../../images/logoSmall.png";
import UserProfile from "./userProfile.tsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let { state } = useLocation();

  return (
    <>
      <AppBar position='fixed' sx={{}}>
        <div className='row g-0' style={{}}>
          <div
            className='col-sm-12 col-md-3 col-lg-3'
            style={{
              backgroundColor: Colors.white,
              color: Colors.black,
            }}
          >
            <Toolbar>
              <img src={logoSmall} alt='logo' width='150px' />
            </Toolbar>
          </div>
          <div
            className='col-sm-12 col-md-9 col-lg-9'
            style={{
              backgroundColor: Colors.darkBlue,
              color: Colors.white,
            }}
          >
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                {state && state?.extraInfo}
              </Typography>
              <UserProfile />
            </Toolbar>
          </div>
        </div>
      </AppBar>
    </>
  );
};

export default Navbar;
