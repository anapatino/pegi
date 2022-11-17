import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { Dashboard, Dashbo } from "../pages/dashboard/dashboard";
import ErrorPage from "../components/ErrorPage";
import App from "../App";
import { RegisterCv } from "../pages/dashboard/cv/registerCv";

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
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Dashbo />,
      },
      {
        path: "register-cv",
        element: <RegisterCv />,
      },
    ],
  },
]);
