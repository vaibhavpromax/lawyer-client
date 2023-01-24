import ChatBot from "react-simple-chatbot";
import stepsOrder from "./steps";

const ChatbotHelper = () => {
  return (
    <ChatBot
      steps={stepsOrder}
      floating={true}
      headerTitle="Vakalat's Chatbot"
    />
  );
};

export default ChatbotHelper;
