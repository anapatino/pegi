import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { Dashboard } from "../pages/dashboard/dashboard";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "ingresar",
        element: <Login />,
      },
    ],
  },
  {
    path: "/principal",
    element: <Dashboard />,
  },
]);
