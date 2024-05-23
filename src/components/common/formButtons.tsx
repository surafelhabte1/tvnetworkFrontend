import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CustomButton, {
  buttonSize,
  buttonType,
  buttonVariant,
} from "../common/button.tsx";

const SubmitButton = ({
  onCancel,
  onSubmit,
  buttonTitle,
}: {
  onCancel?: () => void;
  onSubmit?: () => void;
  buttonTitle?: string;
}) => {
  return (
    <Box sx={{ "& button": { m: 1 }, marginTop: 3, marginBottom: 3 }}>
      <Stack spacing={2} direction='row'>
        <CustomButton
          text='Cancel'
          type={buttonType.button}
          variant={buttonVariant.outlined}
          size={buttonSize.small}
          onClick={() => {
            onCancel && onCancel();
          }}
        />
        <CustomButton text={buttonTitle} type={buttonType.submit} />
      </Stack>
    </Box>
  );
};

export default SubmitButton;
