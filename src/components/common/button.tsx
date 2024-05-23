import * as React from "react";
import Button from "@mui/material/Button";
import { Colors } from "../../util/colors.ts";

export enum buttonType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

export enum buttonVariant {
  text = "text",
  contained = "contained",
  outlined = "outlined",
}
export enum buttonSize {
  small = "small",
  medium = "medium",
}
const CustomButton = ({
  text,
  onClick,
  style,
  type = buttonType.button,
  variant = buttonVariant.contained,
  size = buttonSize.medium,
  startIcon
}: {
  text: string;
  onClick?: () => void;
  style?: StyleSheet;
  type?: buttonType;
  variant?: buttonVariant;
  size?: buttonSize;
  startIcon?: any
}) => {
  return (
    <Button
      sx={{
        mt: 2,
        width: "10%",
        backgroundColor:
          variant === buttonVariant.contained ? Colors.darkBlue : "transparent",
        "&:hover": {
          backgroundColor:
            variant === buttonVariant.contained
              ? Colors.darkBlue
              : "transparent",
          borderColor: Colors.darkBlue,
        },
        color:
          variant === buttonVariant.contained ? Colors.white : Colors.darkBlue,
        borderColor: Colors.darkBlue,
        ...style,
      }}
      onClick={onClick}
      type={type}
      variant={variant}
      size={size}
      startIcon={startIcon}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
