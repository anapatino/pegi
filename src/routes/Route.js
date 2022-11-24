import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { Dashboard, Dashbo } from "../pages/dashboard/dashboard";
import ErrorPage from "../components/ErrorPage";
import App from "../App";
import { RegisterCv } from "../pages/dashboard/cv/cv";
import { Proposal } from "../pages/dashboard/proposal/proposal";
import { Project } from "../pages/project/project";

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
        path: "cv",
        element: <RegisterCv />,
      },
      {
        path: "proposal",
        element: <Proposal />,
      },
      {
        path: "project",
        element: <Project />,
      },
    ],
  },
]);
