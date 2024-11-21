import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import routes from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider router={routes} />
  // </StrictMode>,
);
