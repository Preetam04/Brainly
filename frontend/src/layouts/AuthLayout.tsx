import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("brainly-token");
  const authenticated = token && token.length !== 0;

  return !authenticated ? (
    <div className="h-full w-full bg-background">
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/u"} />
  );
};

export default AuthLayout;
