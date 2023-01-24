import React, { useEffect, useState } from "react";
import { LAWYER_FILTER } from "./config";
import Input from "../../../components/Input/Input";
import Label from "../../../components/Label/Label";
import Button, { THEMES } from "../../../components/Button/Button";
import service from "./../../../util/axiosConfig";

import "./LeftFilter.scss";
import axios from "axios";
const LeftFilter = ({ setLawyers }) => {
  const [input, setInput] = useState({
    location_id: "",
    gender: "",
    experience: "",
    practice_area_id: "",
    language_id: "",
    court_id: "",
  });

  const handleFilter = async () => {
    const query = new URLSearchParams(input).toString();

    // const res = await axios.get(`/lawyer/filters?${query}`);
    const res = await service.get(`/lawyer/filters?${query}`);

    if (res.data.msg === "success") {
      setLawyers(res.data.data);
    }
  };

  return (
    <div className="left_filter">
      <h1 className="left_filter__heading">SEARCH</h1>

      {LAWYER_FILTER.map((field, index) => {
        if (field.type === "text" || field.type === "password") {
          return (
            <div className="input-box" key={index}>
              {/* <Label>{field.label}</Label> */}
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
              {/* <Label className="role">{field.label}</Label> */}
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

      <Button onClick={() => handleFilter()}>Filter</Button>
    </div>
  );
};

export default LeftFilter;
