import "./RBAC.scss";
import { ROLE_ROUTES } from "./constants";
import { Routes, Route, Navigate } from "react-router-dom";

//components
import PageContainer from "../components/PageContainer/PageContainer";
import Navbar from "../components/Navbar/Navbar";
import PageNotFound from "../pages/Common/PageNotFound/PageNotFound";

const RBAC = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const checkAuthentication = () => {
    if (user?.accessToken && Object.keys(ROLE_ROUTES).includes(user?.role)) {
      return true;
    }
    return false;
  };

  return checkAuthentication() ? (
    <PageContainer className={"route-page-container"}>
      <div className={"navbar"}>
        <Navbar
          routes={ROLE_ROUTES[user.role]}
          checkAuthentication={checkAuthentication}
        />
      </div>
      <div className={`route-container`}>
        <Routes>
          {ROLE_ROUTES[user.role].map((route) => {
            return (
              <Route
                key={route.name}
                path={route.path}
                exact
                element={route.component({ user })}
              />
            );
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </PageContainer>
  ) : (
    <Navigate to="/" />
  );
};

export default RBAC;
