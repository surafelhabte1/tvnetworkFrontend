import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";

export enum textInputSize {
  small = "small",
  medium = "medium",
}

export enum textInputVariant {
  outlined = "outlined",
  filled = "filled",
}

export interface menuItemType {
  name: string;
  id: string | number;
}

const CustomTextInput = ({
  label,
  placeholder,
  onChange,
  onEnterKeyPressed,
  value,
  size = textInputSize.small,
  variant = textInputVariant.outlined,
  style,
  startAdornment,
  endAdornment,
  type = "text",
  multiline = false,
  maxRows,
  fullWidth = true,
  select = false,
  menuItem = [],
  helperText,
}: {
  label?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  onEnterKeyPressed?: (value: any) => void;
  value?: string;
  size: textInputSize;
  variant: textInputVariant;
  style?: any;
  startAdornment?: any;
  endAdornment?: any;
  type?: string;
  multiline?: boolean;
  maxRows?: number;
  fullWidth?: boolean;
  select?: boolean;
  menuItem?: menuItemType[];
  helperText?: string;
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onEnterKeyPressed && onEnterKeyPressed(event.target.value);
    }
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      defaultValue={value}
      size={size}
      variant={variant}
      onChange={(value: any) => {
        onChange && onChange(value.target.value);
      }}
      onKeyDown={handleKeyPress}
      sx={{ ...style }}
      InputProps={{
        startAdornment: startAdornment ?? (
          <InputAdornment position='start'>{startAdornment}</InputAdornment>
        ),
        endAdornment: endAdornment ?? (
          <InputAdornment position='end'>{endAdornment}</InputAdornment>
        ),
      }}
      margin='dense'
      type={type}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={maxRows}
      select={select}
      helperText={helperText}
    >
      {select &&
        menuItem.map((item: menuItemType) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        })}
    </TextField>
  );
};

export default CustomTextInput;
