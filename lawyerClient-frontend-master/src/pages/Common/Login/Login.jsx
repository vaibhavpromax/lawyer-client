import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import PageContainer from "../../../components/PageContainer/PageContainer";
import Select from "../../../components/Select/Select";
import Title from "../../../components/Title/Title";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../../constants/roles";
import "./Login.scss";
import service from "./../../../util/axiosConfig";
import Navbar from "../../../components/Navbar/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "", role: "" });
  const options = {
    [ROLES.CLIENT]: "CLIENT",
    [ROLES.LAWYER]: "LAWYER",
  };
  const onSubmit = async () => {
    try {
      const res = await service.post("/auth/login", input);

      if (res.data.data.token) {
        const payload = {
          role: input.role,
          accessToken: res.data.data.token,
          user: res.data.data[input.role],
        };
        localStorage.setItem("user", JSON.stringify(payload));

        if (input.role === ROLES.CLIENT) {
          navigate("/find-lawyers");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(passedVal);
  };

  return (
    <PageContainer className={"login-page"}>
      <Navbar />
      <div className="lc-gradient">
        <img
          // src={
          //   "https://media.istockphoto.com/photos/judge-gavel-and-scale-in-court-legal-concept-picture-id1090431444?k=20&m=1090431444&s=612x612&w=0&h=by_YZG3Mc-wnqx9bSpsKYMKOJkzRDW-WPDfGq8M_Y-o="
          // }
          src="https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <div className="login-container">
        <Card className="login-box">
          <Title className="login_title">SIGN IN</Title>
          <div className="input-box">
            <Label className="role">Who are you ?</Label>
            <Input
              type="select"
              name="role"
              value={input}
              setValue={setInput}
              options={options}
              isSearchable="true"
              width="100%"
              height="45px"
              className="role-select"
              // styles={{ marginTop: "20px" }}
            />
          </div>
          <div className="input-box">
            <Label className="email">Email</Label>
            <Input
              name="email"
              placeholder="Registered mail ID"
              value={input}
              setValue={setInput}
            />
          </div>
          <div className="input-box">
            <Label className="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={input}
              setValue={setInput}
            />
          </div>
          {/* <span className="error">{error}</span> */}
          <div className="buttons">
            <Button onClick={onSubmit} id="login-btn">
              Sign in
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Login;
