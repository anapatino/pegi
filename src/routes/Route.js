import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Home } from "../pages/home/home";
import { Dashboard, Dashbo } from "../pages/dashboard/dashboard";
import ErrorPage from "../components/ErrorPage";
import App from "../App";
import { RegisterCv } from "../pages/dashboard/cv/cv";
import { Proposal } from "../pages/dashboard/proposal/proposal";
import { Project } from "../pages/dashboard/project/project";
import { Register, RegisterUser } from "../pages/login/register";
import { RegisterDocent } from "../pages/login/registerDocent";
import { RegisterStudent } from "../pages/login/registerStudent";
import {
  ConsultProposal,
  ProposalsTable,
} from "../pages/dashboard/proposal/consultProposals";

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
        path: "register/",
        element: <Register />,
        children: [
          {
            path: "",
            element: <RegisterUser />,
          },
          {
            path: "docent/",
            element: <RegisterDocent />,
          },
          {
            path: "student/",
            element: <RegisterStudent />,
          },
        ],
      },
      {
        path: "cv",
        element: <RegisterCv />,
      },
      {
        path: "proposal/",
        element: <Proposal />,
      },
      {
        path: "table-of-proposals/",
        element: <ConsultProposal />,
        children: [
          {
            path: "",
            element: <ProposalsTable />,
          },
        ],
      },
      {
        path: "project",
        element: <Project />,
      },
    ],
  },
]);
