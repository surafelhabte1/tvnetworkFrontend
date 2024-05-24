import * as React from "react";
import { Colors } from "../../util/colors.ts";
import { Icon } from "@iconify/react";
import { z } from "zod";

import logoLarge from "../../images/logoLarge.png";
import CustomButton, { buttonType } from "../common/button.tsx";
import CustomTextInput, {
  textInputSize,
  textInputVariant,
} from "../common/textInput.tsx";
import { useContext, useState } from "react";
import { ModalContext } from "../../App.js";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Config } from "../../util/config.ts";
import axios from "axios";

function Signup() {
  const schema = z.object({
    email: z.string().min(1, { message: "email is required" }),
    password: z.string().min(1, { message: "password is required" }),
    fullname: z.string().min(1, { message: "full name is required" }),
  });

  type FormData = z.infer<typeof schema>;

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    fullname: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        mutation.mutate(formData);
      } catch (error) {
        console.error("signup failed", error);
      }
    }
  };

  const { setLoginData } = useContext(ModalContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${Config.apiBaseUrl}signup`, formData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        setLoginData(data?.data[0]);
        localStorage.setItem("loginData", JSON.stringify(data?.data[0]));
        navigate("/");
      } else {
        alert(data?.message);
      }
    },
  });

  const errorTextStyle = {
    color: Colors.red,
    fontSize: 10,
  };

  return (
    <div
      style={{
        backgroundColor: Colors.black,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div
            className='col-sm-12 col-md-4 col-lg-4'
            style={{
              padding: 20,
              alignContent: "center",
            }}
          >
            <img src={logoLarge} alt='logo' width='100px' />
          </div>
          <div
            className='col-sm-12 col-md-8 col-lg-8'
            style={{
              backgroundColor: Colors.white,
              padding: 20,
            }}
          >
            <h5
              style={{
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              Sign up
            </h5>
            <div>
              <CustomTextInput
                placeholder='Full name'
                size={textInputSize.small}
                variant={textInputVariant.outlined}
                startAdornment={
                  <Icon
                    icon='solar:user-outline'
                    width={24}
                    height={24}
                    style={{
                      marginRight: 10,
                    }}
                  />
                }
                value={formData.fullname}
                onChange={(value: any) => {
                  handleChange("fullname", value);
                }}
              />
              {errors.fullname && (
                <p style={errorTextStyle}>{errors.fullname}</p>
              )}
            </div>
            <div>
              <CustomTextInput
                placeholder='Email Address'
                size={textInputSize.small}
                variant={textInputVariant.outlined}
                startAdornment={
                  <Icon
                    icon='solar:user-outline'
                    width={24}
                    height={24}
                    style={{
                      marginRight: 10,
                    }}
                  />
                }
                value={formData.email}
                onChange={(value: any) => {
                  handleChange("email", value);
                }}
              />
              {errors.email && <p style={errorTextStyle}>{errors.email}</p>}
            </div>
            <div>
              <CustomTextInput
                placeholder='Password'
                size={textInputSize.small}
                variant={textInputVariant.outlined}
                type='password'
                startAdornment={
                  <Icon
                    icon='solar:lock-linear'
                    width={24}
                    height={24}
                    style={{
                      marginRight: 10,
                    }}
                  />
                }
                value={formData.password}
                onChange={(value: any) => {
                  handleChange("password", value);
                }}
              />
              {errors.password && (
                <p style={errorTextStyle}>{errors.password}</p>
              )}
            </div>
            <div>
              <CustomButton
                text='Signup'
                type={buttonType.submit}
                onClick={() => {
                  console.log("login");
                }}
                style={{
                  width: "100%",
                }}
              />
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <Link to={"/login"}>Login here</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
