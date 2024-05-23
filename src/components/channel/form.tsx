import * as React from "react";
import { useContext, useEffect, useState } from "react";

import { z } from "zod";

import CustomTextInput, {
  textInputSize,
  textInputVariant,
} from "../common/textInput.tsx";
import SubmitButton from "../common/formButtons.tsx";
import { Colors } from "../../util/colors.ts";
import { ModalContext } from "../../App.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../util/config.ts";

const ChannelForm = ({
  onCancel,
  onSuccess,
  onError,
}: {
  onCancel: () => void;
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { modalChildrenData, setModalChildrenData, setOpenModal } =
    useContext(ModalContext);

  const schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  type FormData = z.infer<typeof schema>;

  const [formData, setFormData] = useState<FormData>({
    name: modalChildrenData ? modalChildrenData?.name : "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (value: any) => {
    setFormData({
      ...formData,
      name: value,
    });
  };

  const validate = (): boolean => {
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof FormData;
          errorMap[fieldName] = err.message;
        });
        setErrors(errorMap);
      }
      return false;
    }
  };

  const queryClient = useQueryClient();

  const create = async () => {
    await axios.post(`${Config.apiBaseUrl}create/channel`, {
      name: formData.name,
      status: false,
    });
  };

  const update = async () => {
    await axios.post(
      `${Config.apiBaseUrl}update/channel/${modalChildrenData?.id}`,
      {
        name: formData.name,
      }
    );
  };

  const mutation = useMutation({
    mutationFn: (name: string) => {
      modalChildrenData ? update() : create();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channel"] });
      setModalChildrenData(null);
      setOpenModal(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        mutation.mutate(formData.name);
      } catch (error) {
        console.error("Update failed", error);
      }
    }
  };

  const errorTextStyle = {
    color: Colors.red,
    fontSize: 10,
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <CustomTextInput
            label='Name'
            size={textInputSize.medium}
            variant={textInputVariant.filled}
            value={formData.name}
            onChange={(value: any) => {
              handleChange(value);
            }}
          />
          {errors.name && <p style={errorTextStyle}>{errors.name}</p>}
        </div>

        <SubmitButton
          onCancel={onCancel}
          onSubmit={onSuccess}
          buttonTitle={modalChildrenData ? "Update" : "Add"}
        />
      </form>
    </>
  );
};

export default ChannelForm;
