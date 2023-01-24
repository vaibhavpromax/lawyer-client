import React, { useEffect, useState, useRef } from "react";
import AttachmentIcon from "./../../assets/icons/attachment.svg";
import SendIcon from "./../../assets/icons/send.svg";
import "./UploadTextArea.scss";

const TextArea = ({
  change,
  rows,
  color,
  value,
  placeholder,
  handleSubmit,
}) => {
  const [filePreview, setFilePreview] = useState([]);
  const [text, setText] = useState("");
  const inputFile = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
    change({
      file: filePreview,
      text: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFilePreview([...e.target.files]);

    change({
      file: [...e.target.files],
      text,
    });
  };

  const handleDownload = (file) => {
    const url = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("target", "__blank");
    // document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="textarea__container">
        <textarea
          placeholder={placeholder}
          className="custom-textarea custom-form-field "
          style={{ background: color }}
          onChange={handleTextChange}
          rows={rows}
          value={value}
        />
        {/* <img
          src={CloseIcon}
          alt=""
          onClick={() => setShowTextArea(false)}
          className="custom-textarea__close"
        /> */}

        <div className="custom-textarea__file" style={{ background: color }}>
          <div className="custom-textarea__preview">
            {filePreview?.map((file, index) => {
              return (
                <div className="custom-textarea__chip ">
                  <h3 onClick={() => handleDownload(file)}>{file?.name}</h3>
                  <img
                    src=""
                    alt=""
                    onClick={() => {
                      const tempArr = filePreview;
                      tempArr.splice(index, 1);
                      setFilePreview([...tempArr]);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <img
              src={AttachmentIcon}
              alt=""
              onClick={() => {
                inputFile.current.click();
              }}
              className="custom-textarea__attachment mr-2"
            />
            <img
              src={SendIcon}
              alt="send"
              onClick={handleSubmit}
              className="custom-textarea__send"
            />
          </div>
        </div>
        <input
          type="file"
          id="file"
          multiple={true}
          ref={inputFile}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default TextArea;
