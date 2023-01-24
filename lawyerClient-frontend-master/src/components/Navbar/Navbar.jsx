import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { ROLE_ROUTES } from "./../../rbac/constants";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Button from "../Button/Button";
import VakalatIcon from "./../../assets/icons/logo.png";
import AvatarIcon from "./../../assets/icons/avatar.png";
import { ROLES } from "../../constants/roles";

export default function Navbar() {
  const user =
    !!localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const checkAuthentication = () => {
    if (user?.accessToken && Object.keys(ROLE_ROUTES).includes(user?.role)) {
      return true;
    }
    return false;
  };

  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const resp = checkAuthentication();

    setIsLoggedIn(resp);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* <div className="navbar">
        <h2>LAW</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">FIND A LAWYER</Link>
            </li>
            <li>
              <Link to="/">LEGAL SERVICES</Link>
            </li>
            <li>
              <img src="/images/avatar.png" alt="avatar" />
            </li>
            <li>
              <Link to="/signup">
                <Button >SignUp</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div> */}
      <nav>
        <Link to="/">
          <img src={VakalatIcon} className="navbar-logo" alt="vakalat-logo" />
        </Link>
        <ul>
          {user?.role ? (
            user?.role == ROLES["CLIENT"] ? (
              <>
                <li>
                  <Link to="/find-lawyers" className="nav-links">
                    FIND A LAWYER
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="nav-links">
                    CHAT
                  </Link>
                </li>
                <li className="user">
                  <Link to="/client-profile">
                    <img src={AvatarIcon} width={40} height={40} alt="avatar" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/chat" className="nav-links">
                    CHAT
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="nav-links">
                    DASHBOARD
                  </Link>
                </li>

                <li className="user">
                  <Link to="/lawyer-profile">
                    <img src={AvatarIcon} width={40} height={40} alt="avatar" />
                  </Link>
                </li>
              </>
            )
          ) : null}
          {isLoggedIn ? (
            <>
              <li className="buttons">
                <Button onClick={handleLogout} className="nav-button">
                  LogOut
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className="buttons">
                <Link to="/signup">
                  <Button className="nav-button">SignUp</Button>
                </Link>
                <Link to="/login">
                  <Button className="nav-button">Login</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
