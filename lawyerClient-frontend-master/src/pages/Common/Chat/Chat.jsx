import React, { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import TextArea from "../../../components/TextArea/UploadTextArea";
import "./Chat.scss";
import service from "./../../../util/axiosConfig";
import { ROLES } from "../../../constants/roles";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [openedUser, setOpenedUser] = useState([]);
  const [inputData, setInputData] = useState({
    chat: "",
  });

  const clientId = JSON.parse(localStorage.getItem("user"))?.user?.client_id;
  const lawyerId = JSON.parse(localStorage.getItem("user"))?.user?.id;
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      if (userRole === ROLES.LAWYER) {
        const res = await service.get(`/lawyer_client/lawyer/${lawyerId}`);
        setUsers(res.data.data);
      } else if (userRole === ROLES.CLIENT) {
        const res = await service.get(`/lawyer_client/client/${clientId}`);
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUserChat = async (user) => {
    console.log("ujjwal checking ", user);
    setOpenedUser(user);
    try {
      const res = await service.get(`/lawyer_client/chat/${user?.id}`);

      if (res.data.msg === "success") {
        setConversations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendChat = async () => {
    console.log("ujjwal", inputData);
    const payload = {
      lawyer_client_id: openedUser?.id,
      message: inputData.chat,
      sent_by_lawyer: userRole === ROLES.LAWYER,
    };
    try {
      const res = await service.post(`/lawyer_client/chat`, payload);
      if (res.data.msg === "success") {
        const response = await service.get(
          `/lawyer_client/chat/${openedUser?.id}`
        );
        if (response.data.msg === "success") {
          setConversations(response.data.data);
        }

        setInputData({
          ...inputData,
          chat: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="chat">
      <div className="chat_left">
        <h1 className="chat_left__heading">Chat</h1>

        <div className="chat_left__container">
          {users.map((user) => {
            return (
              <div
                className="chat_left__card"
                onClick={() => handleUserChat(user)}
              >
                {userRole === ROLES.LAWYER
                  ? user?.client?.full_name
                  : user?.lawyer?.full_name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat_right">
        <div className="interaction_container">
          {conversations
            ?.slice(0)
            ?.reverse()
            ?.map((interaction, index) => {
              return (
                <>
                  <div
                    className={`interaction_container_image  ${
                      userRole === ROLES.LAWYER
                        ? interaction?.sent_by_lawyer
                          ? "right"
                          : ""
                        : interaction?.sent_by_lawyer
                        ? ""
                        : "right"
                    }`}
                    key={index}
                  >
                    <div className="fontColor_dark image__filename">
                      {interaction.message}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <TextArea
          rows={2}
          color={"white"}
          value={inputData.chat}
          change={(val) => {
            console.log("ujjwal garg", val);
            setInputData({
              ...inputData,
              chat: val.text,
            });
          }}
          handleSubmit={handleSendChat}
        />
      </div>
    </Container>
  );
};

export default Chat;
