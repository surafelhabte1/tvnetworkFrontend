import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { minHeight } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 15,
  borderRadius: 2,
  p: 2,
  minHeight: "50%",
  maxHeight: "70%",

  overflowY: "auto",
  width: "50%"
};

export default function CustomModal({ children, open, headerTitle }) {
  return (
    <div>
      <Modal open={open} onClose={() => {}}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' justifyContent={'center'}>
            {headerTitle}
          </Typography>
            {children}
        </Box>
      </Modal>
    </div>
  );
}
