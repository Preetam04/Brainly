import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("brainly-token");
  const authenticated = token && token.length !== 0;

  return authenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoutes;
