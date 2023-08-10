import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Dashboard, Dashbo } from "../pages/dashboard/dashboard";
import ErrorPage from "../components/ErrorPage";
import App from "../App";
import { RegisterCv } from "../pages/dashboard/cv/cv";
import {
  TutorsTable,
  ConsultTutors,
} from "../pages/dashboard/consult/consultTutor";
import { Proposal } from "../pages/dashboard/proposal/proposal";
import { Project } from "../pages/dashboard/project/project";
import { Register, RegisterUser } from "../pages/login/register";
import { RegisterDocent } from "../pages/login/registerDocent";
import { RegisterStudent } from "../pages/login/registerStudent";
import {
  ProjectRepository,
  ProjectTableRepository,
} from "../pages/dashboard/projectRepository/projectRepository";
import {
  ProposalTutorRepository,
  ProposalsTutorTableRepository,
} from "../pages/dashboard/proposalRepository/proposalTutorRepository";
import {
  ProjectTutorRepository,
  ProjectTutorTableRepository,
} from "../pages/dashboard/projectRepository/projectTutorRepository";
import {
  ProposalRepository,
  ProposalsTableRepository,
} from "../pages/dashboard/proposalRepository/proposalRepository";
import {
  ConsultProposal,
  ProposalsTable,
} from "../pages/dashboard/proposal/consultProposals";

import {
  ConsultProject,
  ProjectsTable,
} from "../pages/dashboard/project/consultProject";

import ConsultResearchLines from "../pages/dashboard/consult/consultResearchLines";
import {
  RegisterResearchLines,
  RegisterLines,
} from "../pages/dashboard/register/registerResearchLine";
import RegisterResearchSubline from "../pages/dashboard/register/registerResearchSubline";
import RegisterAreaThematic from "../pages/dashboard/register/registerAreaThematic";
import {
  ProposedAssignment,
  ProposedTable,
} from "../pages/dashboard/register/proposedAssignment";
import {
  ProjectAssignment,
  ProjectTable,
} from "../pages/dashboard/register/projectAssignment";
import { DashboardAdministrador } from "../pages/dashboard/dashboardAdministrador";
import { DashboardProfessor } from "../pages/dashboard/dashboardProfessor";
import { DashboardStudent } from "../pages/dashboard/dashboardStudent";
import { ModifyProposal } from "../pages/dashboard/proposal/modifyProposal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Dashbo />,
      },
      {
        path: "student/",
        element: <DashboardStudent />,
      },
      {
        path: "professor/",
        element: <DashboardProfessor />,
      },
      {
        path: "administrator/",
        element: <DashboardAdministrador />,
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
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProposalsTable />,
          },
          {
            path: "modify-proposal/:proposal",
            element: <ModifyProposal />,
          },
        ],
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "table-of-project/",
        element: <ConsultProject />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProjectsTable />,
          },
        ],
      },
      {
        path: "proposal-repository/",
        element: <ProposalRepository />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProposalsTableRepository />,
          },
        ],
      },
      {
        path: "project-repository/",
        element: <ProjectRepository />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProjectTableRepository />,
          },
        ],
      },
      {
        path: "proposal-tutor-repository/",
        element: <ProposalTutorRepository />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProposalsTutorTableRepository />,
          },
        ],
      },
      {
        path: "project-tutor-repository/",
        element: <ProjectTutorRepository />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProjectTutorTableRepository />,
          },
        ],
      },
      {
        path: "consult-tutors",
        element: <ConsultTutors />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <TutorsTable />,
          },
        ],
      },

      {
        path: "consult-research-line",
        element: <ConsultResearchLines />,
        errorElement: <ErrorPage />,
      },
      {
        path: "register-research-line/",
        element: <RegisterLines />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <RegisterResearchLines />,
          },
          {
            path: "subline/",
            element: <RegisterResearchSubline />,
          },
          {
            path: "area-thematic/",
            element: <RegisterAreaThematic />,
          },
        ],
      },
      {
        path: "proposed-assignment",
        element: <ProposedAssignment />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProposedTable />,
          },
        ],
      },
      {
        path: "project-assignment",
        element: <ProjectAssignment />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <ProjectTable />,
          },
        ],
      },
    ],
  },
]);
