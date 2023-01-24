import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/TextArea/UploadTextArea";
import "./Request.scss";

import service from "./../../../util/axiosConfig";
import Label from "../../../components/Label/Label";

const Request = () => {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    request_title: "",
    request_body: "",
  });

  const handleChange = (e, state) => {
    setInputData({
      ...inputData,
      [state]: e.target.value,
    });
  };

  const handleRequestLawyer = () => {
    const payload = {
      lawyer_id: parseInt(id),
      request_data: {
        title: inputData.request_title,
        body: inputData.request_body,
      },
    };

    const res = service.post("/request", payload);
    window.alert("Request has been sent, lawyer will contact you soon");
  };

  return (
    <div className="request__container">
      <h1>Contact lawyer</h1>

      <div>
        <Label> Title </Label>
        <Input
          type="text"
          name="request_title"
          value={inputData}
          setValue={setInputData}
        />

        <Label> Body </Label>
        <textarea
          className="custom-form-field "
          onChange={(e) => handleChange(e, "request_body")}
          rows={5}
          value={inputData.request_body}
        />

        <Button onClick={handleRequestLawyer}>Contact</Button>
      </div>
    </div>
  );
};

export default Request;
