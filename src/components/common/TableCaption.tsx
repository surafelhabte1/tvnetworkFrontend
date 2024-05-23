import * as React from "react";
import CustomTextInput, {
  textInputSize,
  textInputVariant,
} from "./textInput.tsx";
import { Icon } from "@iconify/react";
import CustomButton, { buttonVariant } from "./button.tsx";
import { useContext } from "react";
import { ModalContext } from "../../App.js";
import Stack from "@mui/material/Stack";

export interface tablCaptionProps {
  onExportClick: () => void;
  onFilterClick: () => void;
  onAddClick: () => void;
  model: string;
  onSearch: (value: any) => void;
}

const TableCaption = ({
  onExportClick,
  onFilterClick,
  onAddClick,
  model,
  onSearch,
}: tablCaptionProps) => {
  return (
    <>
      <div className='row'>
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <CustomTextInput
            placeholder='Search'
            size={textInputSize.small}
            variant={textInputVariant.outlined}
            value=''
            onEnterKeyPressed={(value: any) => {
              onSearch(value);
            }}
            fullWidth={true}
            startAdornment={
              <Icon
                icon='material-symbols:search'
                width={24}
                height={24}
                style={{
                  marginRight: 10,
                  color: "grey",
                }}
              />
            }
            style={{
              backgroundColor: "#ECECEC",
              borderColor: "transparent",
            }}
          />
        </div>
        <div className='col-sm-12 col-md-6 col-lg-6'>
          <Stack spacing={2} direction={"row"}>
            <CustomButton
              text='Export'
              startIcon={
                <Icon
                  icon='ph:export-bold'
                  width={20}
                  height={20}
                  style={{
                    marginRight: 10,
                  }}
                />
              }
              variant={buttonVariant.text}
              onClick={() => {
                onExportClick();
              }}
            />

            <CustomButton
              text='Add Filter'
              variant={buttonVariant.text}
              startIcon={
                <Icon
                  icon='octicon:filter-16'
                  width={20}
                  height={20}
                  style={{
                    marginRight: 10,
                  }}
                />
              }
              onClick={() => {
                onFilterClick();
              }}
              style={{
                width: "50%",
              }}
            />
            <CustomButton
              text={`Add ${model}`}
              onClick={() => {
                onAddClick();
              }}
              style={{
                width: "50%",
              }}
            />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default TableCaption;
