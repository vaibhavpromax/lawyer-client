import LawyerProfile from "../LawyerProfile/LawyerProfile";
import { practiceAreas } from "./practiceareas";
import { lawyerdata } from "./lawyerdata";
import lawyerAvatar from "../assets/lawyerIcon.png";
const lawyerInfo = lawyerdata[Math.floor(Math.random() * lawyerdata.length)];
const stepsOrder = [
  {
    id: 1,
    message: "Hello this is Vakalat's chatbot",
    trigger: 2,
  },
  {
    id: 2,
    message: "Enter your name:",
    trigger: 3,
  },
  {
    id: 3,
    user: true,
    trigger: 4,
  },
  {
    id: 4,
    message: "Hello {previousValue} how may I help you ?",
    trigger: 5,
  },
  {
    id: 5,
    user: true,
    trigger: 6,
  },
  {
    id: 6,
    options: practiceAreas,
  },
  {
    id: 7,
    component: (
      <LawyerProfile
        image={lawyerAvatar}
        name={lawyerInfo.name}
        contact={lawyerInfo.contact}
      />
    ),
    end: true,
  },
];

export default stepsOrder;
