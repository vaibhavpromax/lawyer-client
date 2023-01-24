import Dashboard from "../../pages/Client/Dashboard/Dashboard";
import ClientProfile from "../../pages/Client/Profile/ClientProfile";
import LawyerProfile from "../../pages/Lawyer/Profile/Profile";
import FindLawyer from "../../pages/Client/FindLawyer/FindLawyer";
import Chat from "../../pages/Common/Chat/Chat";
import Request from "../../pages/Client/Request/Request";

export const CLIENT_ROUTES = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: (props) => <Dashboard {...props} />,
  // },
  {
    path: "/client-profile",
    name: "Profile",
    component: (props) => <ClientProfile {...props} />,
  },
  {
    path: "/find-lawyers",
    name: "Find Lawyers",
    component: (props) => <FindLawyer {...props} />,
  },
  {
    path: "/lawyer/request/:id",
    name: "Request",
    component: (props) => <Request {...props} />,
  },
  {
    path: "/lawyer/:id",
    name: "Lawyer Profile",
    component: (props) => <LawyerProfile {...props} />,
  },
  {
    path: "/chat",
    name: "Chat",
    component: (props) => <Chat {...props} />,
  },
];
