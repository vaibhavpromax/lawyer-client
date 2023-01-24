import Dashboard from "../../pages/Lawyer/Dashboard/Dashboard";
import LawyerProfile from "../../pages/Lawyer/Profile/Profile";
import Chat from "../../pages/Common/Chat/Chat";
import YourLawyerProfile from "../../pages/Lawyer/YourLawyerProfile/YourLawyerProfile";

export const LAWYER_ROUTES = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: (props) => <Dashboard {...props} />,
  },
  {
    path: "/lawyer-profile",
    name: "Profile",
    component: (props) => <YourLawyerProfile {...props} />,
  },
  {
    path: "/chat",
    name: "Chat",
    component: (props) => <Chat {...props} />,
  },
];
