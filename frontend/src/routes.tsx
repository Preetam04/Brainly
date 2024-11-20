import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./providers/PrivateRoutes";
import Home from "./pages/u/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SharedBrain from "./pages/SharedBrain";
import HomeLayout from "./layouts/HomeLayout";
import AuthLayout from "./layouts/AuthLayout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<PrivateRoutes />}>
        <Route element={<HomeLayout />} path="u">
          <Route path="" element={<Home />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
      <Route path="shared/:hash" element={<SharedBrain />} />
    </Route>
  )
);

export default routes;
