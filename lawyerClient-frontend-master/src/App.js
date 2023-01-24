import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

//components
import RBAC from "./rbac/RBAC";
import HomePage from "./pages/Common/HomePage/HomePage";
import Login from "./pages/Common/Login/Login";
import Signup from "./pages/Common/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import FindLawyer from "./pages/Client/FindLawyer/FindLawyer";
import { useEffect } from "react";
import ChatbotHelper from "./components/Chatbot/chatbot/ChatbotHelper";

function App() {
  // axios.defaults.baseURL = "http://localhost:8080";

  // axios.defaults.headers.common["Authorization"] = `Bearer ${
  //   JSON.parse(localStorage.getItem("user"))?.accessToken
  // }`;

  // const payload = {
  //   role: "client",
  //   accessToken: "tken",
  // };
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(payload));
  // }, []);
  return (
    <BrowserRouter>
      <ChatbotHelper />
      <Routes>
        {/* Open Routes */}
        {/* <Route path="/" exact element={<Navbar />}> */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" exact element={<Login />} />
        {/* Routes rendered according to role*/}
        <Route path="/signup" element={<Signup />} />
        {/* </Route> */}
        <Route path="/*" element={<RBAC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
