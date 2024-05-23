import * as React from "react";
import { Icon } from "@iconify/react";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { Colors } from "../../util/colors.ts";
import { Stack } from "@mui/material";
import CustomButton, { buttonType, buttonVariant } from "./button.tsx";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../App";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const onUserIconClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onPopOverClosed = () => {
    setAnchorEl(null);
  };

  let localstorageData: any = localStorage.getItem("loginData");

  const [data, setData] = useState(null);

  const { setLoginData } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    let data = JSON.parse(localstorageData);
    setData(data);
  }, [localstorageData]);

  const logout = () => {
    if (window.confirm("are you sure want to logout ?")) {
      setLoginData(null);
      localStorage.removeItem("loginData");
      navigate("/login");
    }
  };

  return (
    <>
      <IconButton
        size='medium'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 0 }}
        aria-describedby={id}
        onClick={onUserIconClicked}
      >
        <Icon icon='carbon:circle-solid' width={24} height={24} style={{}} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onPopOverClosed}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{}}>
          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
              padding: 2,
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: 35,
                width: 35,
                border: `2px solid ${Colors.darkBlue}`,
                textAlign: "center",
              }}
            >
              <Icon
                icon='ph:user-light'
                width={20}
                height={20}
                style={{
                  color: Colors.darkBlue,
                }}
              />
            </div>

            <span>
              <b>{data && data?.fullname}</b>
            </span>
            <small
              style={{
                fontWeight: 500,
                fontSize: 7,
              }}
            >
              {data && data?.email}
            </small>
          </Stack>

          <Stack
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <hr
              style={{
                border: `1px solid ${Colors.darkBlue}`,
                width: "100%",
                backgroundColor: Colors.darkBlue,
              }}
            />
            <CustomButton
              text='Logout'
              type={buttonType.button}
              variant={buttonVariant.text}
              onClick={() => {
                logout();
              }}
              style={{
                color: Colors.red,
              }}
            />
          </Stack>
        </div>
      </Popover>
    </>
  );
};

export default UserProfile;
