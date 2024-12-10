import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BaseLayout = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Outlet />
    </>
  );
};

export default BaseLayout;
