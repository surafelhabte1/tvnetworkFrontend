import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import Grid from "@mui/material/Grid";

import CustomTextInput, {
  textInputSize,
  textInputVariant,
} from "../common/textInput.tsx";
import SubmitButton from "../common/formButtons.tsx";
import { Colors } from "../../util/colors.ts";
import { ModalContext } from "../../App.js";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { Config } from "../../util/config.ts";
import axios from "axios";

const ProgramForm = ({
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

  // load dropdown datas
  const [{ data: channelData }, { data: typeData }, { data: categorieData }] =
    useQueries({
      queries: [
        {
          queryKey: ["channel"],
          queryFn: async () => {
            const response = await axios.post(
              `${Config.apiBaseUrl}get/channel`,
              {
                orderBy: {},
                searchField: "name",
                searchTerm: "",
              }
            );
            return response.data?.data;
          },
        },
        {
          queryKey: ["type"],
          queryFn: async () => {
            const response = await axios.post(`${Config.apiBaseUrl}get/type`, {
              orderBy: {},
              searchField: "name",
              searchTerm: "",
            });
            return response.data?.data;
          },
        },
        {
          queryKey: ["categorie"],
          queryFn: async () => {
            const response = await axios.post(
              `${Config.apiBaseUrl}get/categorie`,
              {
                orderBy: {},
                searchField: "name",
                searchTerm: "",
              }
            );
            return response.data?.data;
          },
        },
      ],
    });

  const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    duration: z.string().min(1, { message: "Duration is required" }),
    description: z.string().min(1, { message: "description is required" }),
    channelid: z.number().min(1, { message: "channel is required" }),
    typeid: z.number().min(1, { message: "type is required" }),
    categoryid: z.number().min(1, { message: "category is required" }),
    videourl: z.string().min(1, { message: "videourl is required" }),
    thumbnailurl: z.string().min(1, { message: "thumbnailurl is required" }),
  });

  type FormData = z.infer<typeof schema>;

  const [formData, setFormData] = useState<FormData>({
    title: modalChildrenData ? modalChildrenData?.title : "",
    duration: modalChildrenData ? modalChildrenData?.duration : "",
    description: modalChildrenData ? modalChildrenData?.description : "",
    channelid: modalChildrenData ? modalChildrenData?.channelid : null,
    typeid: modalChildrenData ? modalChildrenData?.typeid : null,
    categoryid: modalChildrenData ? modalChildrenData?.categoryid : null,
    videourl: modalChildrenData ? modalChildrenData?.videourl : "",
    thumbnailurl: modalChildrenData ? modalChildrenData?.thumbnailurl : "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
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
    await axios.post(`${Config.apiBaseUrl}create/program`, {
      ...formData,
      status: false,
    });
  };

  const update = async () => {
    await axios.post(
      `${Config.apiBaseUrl}update/program/${modalChildrenData?.id}`,
      formData
    );
  };

  const mutation = useMutation({
    mutationFn: (name: string) => {
      modalChildrenData ? update() : create();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program"] });
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

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  const errorTextStyle = {
    color: Colors.red,
    fontSize: 10,
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <div>
              <CustomTextInput
                label='Title'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.title}
                onChange={(value: any) => {
                  handleChange("title", value);
                }}
              />
              {errors.title && <p style={errorTextStyle}>{errors.title}</p>}
            </div>
            <div>
              <CustomTextInput
                label='Video Url'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.videourl}
                onChange={(value: any) => {
                  handleChange("videourl", value);
                }}
              />
              {errors.videourl && (
                <p style={errorTextStyle}>{errors.videourl}</p>
              )}
            </div>
            <div>
              <CustomTextInput
                label='Channel'
                placeholder='Select'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.channelid}
                onChange={(value: any) => {
                  handleChange("channelid", value);
                }}
                select={true}
                menuItem={channelData}
                fullWidth={true}
              />

              {errors.channelid && (
                <p style={errorTextStyle}>{errors.channelid}</p>
              )}
            </div>
            <div>
              <CustomTextInput
                label='Type'
                placeholder='Select'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.typeid}
                onChange={(value: any) => {
                  handleChange("typeid", value);
                }}
                select={true}
                menuItem={typeData}
                fullWidth={true}
              />

              {errors.typeid && <p style={errorTextStyle}>{errors.typeid}</p>}
            </div>
          </Grid>
          <Grid item xs={6} sm={6}>
            <div>
              <CustomTextInput
                label='Duration'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.duration}
                onChange={(value: any) => {
                  handleChange("duration", value);
                }}
              />
              {errors.duration && (
                <p style={errorTextStyle}>{errors.duration}</p>
              )}
            </div>
            <div>
              <CustomTextInput
                label='Thumbnail Url'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.thumbnailurl}
                onChange={(value: any) => {
                  handleChange("thumbnailurl", value);
                }}
              />
              {errors.thumbnailurl && (
                <p style={errorTextStyle}>{errors.thumbnailurl}</p>
              )}
            </div>
            <div>
              <CustomTextInput
                label='Category'
                placeholder='Select'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.categoryid}
                onChange={(value: any) => {
                  handleChange("categoryid", value);
                }}
                select={true}
                menuItem={categorieData}
                fullWidth={true}
              />

              {errors.categoryid && (
                <p style={errorTextStyle}>{errors.categoryid}</p>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div>
              <CustomTextInput
                label='Description'
                size={textInputSize.small}
                variant={textInputVariant.filled}
                value={formData.description}
                onChange={(value: any) => {
                  handleChange("description", value);
                }}
                multiline={true}
                maxRows={4}
                fullWidth={true}
              />
              {errors.description && (
                <p style={errorTextStyle}>{errors.description}</p>
              )}
            </div>
          </Grid>
        </Grid>

        <SubmitButton
          onCancel={onCancel}
          onSubmit={onSuccess}
          buttonTitle={modalChildrenData ? "Update" : "Add"}
        />
      </form>
    </>
  );
};

export default ProgramForm;
