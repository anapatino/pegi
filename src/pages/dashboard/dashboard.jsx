import {
  Container,
  Spacer,
  Button,
  User,
  Row,
  Dropdown,
  Tooltip,
} from "@nextui-org/react";
import { ContainerDash } from "../../styled-components/Containers";
import { ReactComponent as Vector } from "../../assets/icons/Vector.svg";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../data/user";
import { useQuery } from "react-query";
import { getProfessorByDocument } from "../../controllers/professor";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const user = getUser();
  const root =
    user.role === "Estudiante"
      ? "/dashboard/student/"
      : user.role === "Docente"
      ? "/dashboard/professor/"
      : "/dashboard/administrator/";
  const colorPrincipal =
    user.role === "Estudiante"
      ? "primary"
      : user.role === "Docente"
      ? "secondary"
      : "success";

  const professor = useQuery(
    ["searchProfessor", user],
    () => getProfessorByDocument(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  return (
    <ContainerDash>
      <Container
        css={{
          paddingTop: "2rem",
          marginLeft: "20px",
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-start",
        }}
      >
        <Vector />
        <Spacer y={2} />
        <Tooltip content="Dashboard" placement="right" color={colorPrincipal}>
          <Button
            id="dashboard"
            light
            rounded
            auto
            onClick={() => setTitle("Dashboard")}
          >
            <Link
              to={root}
              style={{ color: "#FFF" }}
              className="bi bi-bar-chart"
            />
          </Button>
        </Tooltip>
        <Spacer y={1} />
        {user.role !== "Administrador" ? (
          <Tooltip
            content="Hoja de vida"
            placement="right"
            color={colorPrincipal}
          >
            <Button
              id="cv"
              light
              rounded
              auto
              onClick={() => setTitle("Perfil")}
            >
              <Link
                to="cv"
                style={{ color: "#FFF" }}
                className="bi bi-person-fill"
              />
            </Button>
          </Tooltip>
        ) : (
          ""
        )}
        {user.role === "Estudiante" ? (
          <div>
            <Spacer y={1} />
            <Tooltip
              content="Registrar Propuesta"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="proposal"
                light
                rounded
                auto
                onClick={() => setTitle("Propuesta")}
              >
                <Link
                  to="proposal"
                  style={{ color: "#FFF" }}
                  className="bi bi-journal"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Consultar Propuesta"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="table-of-proposals"
                light
                rounded
                auto
                onClick={() => setTitle("Repositorio")}
              >
                <Link
                  to="table-of-proposals/"
                  style={{ color: "#FFF" }}
                  className="bi bi-collection-fill"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Registrar Proyecto"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="project"
                light
                rounded
                auto
                onClick={() => setTitle("Proyecto")}
              >
                <Link
                  to="project"
                  style={{ color: "#FFF" }}
                  className="bi bi-journal-bookmark-fill"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Consultar Proyecto"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="table-of-project"
                light
                rounded
                auto
                onClick={() => setTitle("Repositorio")}
              >
                <Link
                  to="table-of-project/"
                  style={{ color: "#FFF" }}
                  className="bi bi-box2-fill"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Consultar Tutores"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="consult-tutors"
                light
                rounded
                auto
                onClick={() => setTitle("Consultar Tutores")}
              >
                <Link
                  to="consult-tutors"
                  style={{ color: "#FFF" }}
                  className="bi bi-person-bounding-box"
                />
              </Button>
            </Tooltip>
          </div>
        ) : user.role === "Administrador" ? (
          <div>
            <Tooltip
              content="Gestionar Usuarios"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="register"
                light
                rounded
                auto
                onClick={() => setTitle("Gestionar Usuarios")}
              >
                <Link
                  to="register"
                  style={{ color: "#FFF" }}
                  className="bi bi-person-fill-gear"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Asignacion de Propuesta"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="proposed-assignment"
                light
                rounded
                auto
                onClick={() => setTitle("Asignacion de Propuesta")}
              >
                <Link
                  to="proposed-assignment"
                  style={{ color: "#FFF" }}
                  className="bi bi-person-video"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Asignacion de Proyecto"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="project-assignment"
                light
                rounded
                auto
                onClick={() => setTitle("Asignacion de Proyecto")}
              >
                <Link
                  to="project-assignment"
                  style={{ color: "#FFF" }}
                  className="bi bi-person-video2"
                />
              </Button>
            </Tooltip>
            <Spacer y={1} />
            <Tooltip
              content="Registrar Lineas de investigacion"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="register-research-line"
                light
                rounded
                auto
                onClick={() => setTitle("Lineas de Investigacion")}
              >
                <Link
                  to="register-research-line"
                  style={{ color: "#FFF" }}
                  className="bi bi-filter-square"
                />
              </Button>
            </Tooltip>
          </div>
        ) : user.role === "Docente" ? (
          <div>
            <Spacer y={2} />
            <Tooltip
              content="Repositorio de Propuestas"
              placement="right"
              color={colorPrincipal}
            >
              {professor.isSuccess &&
              professor.data.data.position !== "tutor" ? (
                <Button
                  id="proposal-repository"
                  light
                  rounded
                  auto
                  onClick={() => setTitle("Repositorio de Propuestas")}
                >
                  <Link
                    to="proposal-repository/"
                    style={{ color: "#FFF" }}
                    className="bi bi-inbox-fill"
                  />
                </Button>
              ) : (
                <Button
                  id="proposal-tutor-repository"
                  light
                  rounded
                  auto
                  onClick={() => setTitle("Repositorio de Propuestas")}
                >
                  <Link
                    to="proposal-tutor-repository/"
                    style={{ color: "#FFF" }}
                    className="bi bi-inbox-fill"
                  />
                </Button>
              )}
            </Tooltip>
            <Spacer y={2} />
            <Tooltip
              content="Repositorio de Proyectos"
              placement="right"
              color={colorPrincipal}
            >
              {professor.isSuccess &&
              professor.data.data.position !== "tutor" ? (
                <Button
                  id="project-repository"
                  light
                  rounded
                  auto
                  onClick={() => setTitle("Repositorio de Proyectos")}
                >
                  <Link
                    to="project-repository/"
                    style={{ color: "#FFF" }}
                    className="bi bi-inboxes-fill"
                  />
                </Button>
              ) : (
                <Button
                  id="project-tutor-repository"
                  light
                  rounded
                  auto
                  onClick={() => setTitle("Repositorio de Proyectos")}
                >
                  <Link
                    to="project-tutor-repository/"
                    style={{ color: "#FFF" }}
                    className="bi bi-inboxes-fill"
                  />
                </Button>
              )}
            </Tooltip>
            <Spacer y={2} />
            <Tooltip
              content="Consultar Lineas de investigacion"
              placement="right"
              color={colorPrincipal}
            >
              <Button
                id="consult-research-line"
                light
                rounded
                auto
                onClick={() => setTitle("Consultar Lineas de Investigacion")}
              >
                <Link
                  to="consult-research-line"
                  style={{ color: "#FFF" }}
                  className="bi bi-filter-square-fill"
                />
              </Button>
            </Tooltip>
          </div>
        ) : (
          ""
        )}
      </Container>
      <Container css={{ minHeight: "100vh", overflow: "hidden" }}>
        <Container
          css={{ height: "10%", marginTop: "1.2rem", marginBottom: "1.2rem" }}
        >
          <Row align="center" justify="flex-start">
            <Container css={{ width: "85%", margin: "0" }}>
              <h2>{title}</h2>
            </Container>
            <Container
              alignItems="flex-start"
              css={{ width: "10%", margin: "0" }}
            >
              <Dropdown
                name="dropdown"
                isOpen={isOpen}
                onOpenChange={setIsOpen}
              >
                <Dropdown.Trigger>
                  <User
                    bordered
                    color={
                      user.role === "Estudiante"
                        ? "primary"
                        : user.role === "Docente"
                        ? "secondary"
                        : "gradient"
                    }
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    name={
                      user.FirstName != null
                        ? user.FirstName + " " + user.FirstLastName
                        : user.nameUser
                    }
                    description={user != null ? user.Email : ""}
                    css={{ px: 9 }}
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu
                  onAction={(e) => {
                    if (e === "logout") {
                      localStorage.clear();
                      navigate("/");
                      window.location.reload();
                    }
                  }}
                >
                  <Dropdown.Item key="settings" withDivider>
                    Configuraciones
                  </Dropdown.Item>
                  <Dropdown.Item key="system">Sistema</Dropdown.Item>
                  <Dropdown.Item key="help_and_feedback" withDivider>
                    Ayuda y Recomendaciones
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="logout"
                    key="logout"
                    color="error"
                    withDivider
                  >
                    Salir
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Row>
        </Container>
        <Container css={{ height: "80%", width: "100%", overflow: "hidden" }}>
          <Outlet />
        </Container>
      </Container>
    </ContainerDash>
  );
}

export const Dashbo = () => {
  return <></>;
};
