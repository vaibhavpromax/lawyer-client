import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import PageContainer from "../../../components/PageContainer/PageContainer";
import Title from "../../../components/Title/Title";
import Container from "../../../components/Container/Container";
import { LAWYER_INPUT_FIELDS } from "../../Common/SignUp/constants";
import { CLIENT_INPUT_FIELDS } from "../../Common/SignUp/constants";
import ButtonThemes from "../../../components/Button/Themes";
import { ROLES } from "../../../constants/roles";

import "./Signup.scss";
import service from "./../../../util/axiosConfig";
import Navbar from "../../../components/Navbar/Navbar";

export default function SignUp() {
  const [role, setRole] = useState(ROLES.CLIENT);
  const [inputFields, setInputFields] = useState(CLIENT_INPUT_FIELDS);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    location_id: 0,
    email: "",
    phone: "",
    password: "",
    education: "",
    gender: "",
    experience: 0,
    courts: "",
    practice_areas: [],
    languages: [],
  });

  useEffect(() => {
    if (role === ROLES.CLIENT) {
      setInputFields(CLIENT_INPUT_FIELDS);
    } else {
      setInputFields(LAWYER_INPUT_FIELDS);
    }
  }, [role]);

  const handelSignUp = async () => {
    if (role === ROLES.CLIENT) {
      const clientPayload = {
        ...input,
        location_id: Number(input.location_id),
      };

      // const deleteKeys = [
      //   "courts",
      //   "education",
      //   "experience",
      //   "languages",
      //   "location_id",
      //   "practice_areas",
      // ];

      // deleteKeys.forEach((e) => delete clientPayload[e]);

      await service.post("/client", clientPayload);
      window.location.href = "/login";
    } else {
      const lawyerPayload = {
        ...input,
        experience: Number(input.experience),
        location_id: Number(input.location_id),
        languages: [{ language_id: Number(input.languages) }],
        courts: [{ court_id: Number(input.courts) }],
        practice_areas: [{ practice_area_id: Number(input.practice_areas) }],
      };
      console.log("ujjwal", lawyerPayload);

      await service.post("/lawyer", lawyerPayload);
      window.location.href = "/login";
    }
  };

  return (
    <PageContainer>
      <Container>
        <Navbar />
        <div className={"signup-page-container"}>
          <div className="signup-header">
            <Title>Register Here</Title>
            <div>
              We need you to help us with some basic information for your
              account creation. All fields are mandatory
            </div>
          </div>
          <div className="role-buttons">
            <Button
              onClick={() => setRole(ROLES.CLIENT)}
              theme={
                role === ROLES.CLIENT
                  ? ButtonThemes.PRIMARY
                  : ButtonThemes.GREY_OUTLINE
              }
            >
              CLIENT
            </Button>
            <Button
              onClick={() => setRole(ROLES.LAWYER)}
              theme={
                role === ROLES.LAWYER
                  ? ButtonThemes.PRIMARY
                  : ButtonThemes.GREY_OUTLINE
              }
            >
              LAWYER
            </Button>
          </div>
          <div className="signup-box">
            {inputFields.map((field, index) => {
              if (
                field.type === "text" ||
                field.type === "password" ||
                field.type === "number"
              ) {
                return (
                  <div className="input-box" key={index}>
                    <Label>{field.label}</Label>
                    <Input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={input}
                      setValue={setInput}
                    />
                  </div>
                );
              }
              if (field.type === "select") {
                return (
                  <div className="input-box" key={index}>
                    <Label className="role">{field.label}</Label>
                    <Input
                      type="select"
                      placeholder={field.placeholder}
                      options={field.options}
                      setValue={setInput}
                      value={input}
                      name={field.name}
                      isSearchable="true"
                      height="45px"
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="buttons">
            <br />
            <Button onClick={handelSignUp} id="login-btn">
              Register Now
            </Button>
          </div>
        </div>
      </Container>
    </PageContainer>
  );
}
