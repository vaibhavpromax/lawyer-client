import React, { useEffect, useState } from "react";
import "./InputTime.scss";
import Input from "../../Input";
import { MeridianData } from "../../constants";
import moment from "moment";

const convertFrom24Hour = (time) => {
  const converted = moment(time, "HH:mm").format("hh:mm A");
  const hh = converted.slice(0, 2);
  const mm = converted.slice(3, 5);
  const a = converted.slice(6, 9);
  return { hh, mm, a };
};

const convertTo24Hour = (time) => {
  return moment(time, "hh:mm A").format("HH:mm");
};

const InputTime = ({
  input,
  setInput,
  name,
  className = "",
  reRender,
  ...rest
}) => {
  const { hh, mm, a } = convertFrom24Hour(
    typeof input === "object" ? input[name] : input
  );
  const [internalState, setInternalState] = useState({ hh, mm, a });

  useEffect(() => {
    setInternalState({ hh, mm, a });
  }, [reRender]);

  useEffect(() => {
    const { hh, mm, a } = internalState;
    if (typeof input === "object") {
      setInput((prev) => ({
        ...prev,
        [name]: convertTo24Hour(`${hh}:${mm} ${a}`),
      }));
    } else {
      setInput(convertTo24Hour(`${hh}:${mm} ${a}`));
    }
  }, [internalState]);

  return (
    <div className={`input-time ${className}`} {...rest}>
      <div className="input-fields">
        <div className="hh">
          <Input
            type="number"
            max="12"
            name="hh"
            width="100%"
            value={internalState}
            setValue={setInternalState}
            placeholder="00"
          />
        </div>
        <div className="colon">:</div>
        <div className="mm">
          <Input
            type="number"
            name="mm"
            max="59"
            width="100%"
            value={internalState}
            setValue={setInternalState}
            placeholder="00"
          />
        </div>
        <div className="a">
          <Input
            type="select"
            name="a"
            className="meridian-select"
            options={MeridianData.options}
            width="100%"
            value={internalState}
            setValue={setInternalState}
            placeholder="None"
          />
        </div>
      </div>
    </div>
  );
};

export default InputTime;
