import {
  Table,
  Row,
  Loading,
  Container,
  Col,
  Tooltip,
  Text,
  Spacer,
} from "@nextui-org/react";
import { StyledBadge } from "../../../assets/icons/StyledBadge";
import { EyeIcon } from "../../../assets/icons//EyeIcon";
import { IconButton } from "../../../assets/icons//IconButton";
import { getUser } from "../../../data/user";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  getProjectByCode,
  getHistorialProject,
  getProjectByProfessorDocument,
} from "../../../controllers/project";
import { getProfessorByDocument } from "../../../controllers/professor";
import Message from "../../../components/message";
import { useNavigate } from "react-router-dom";
import DetailsDocument from "../../../components/DetailsDocument";
import HistoryDocument from "../../../components/HistoryDocument";

export function ProjectTutorRepository() {
  return <Outlet />;
}

export function ProjectTutorTableRepository() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const navigate = useNavigate();
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let user = getUser();
  const [codeProject, setCodeProject] = useState("");
  const [codeProjectHistory, setCodeProjectHistory] = useState("");

  const professor = useQuery(
    ["searchProfessor", user],
    () => getProfessorByDocument(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["getAllProjectByProfessor"],
    () => getProjectByProfessorDocument(user.personDocument, requestOptions),
    {
      refetchInterval: 19000,
    }
  );

  const view = useQuery(
    ["view", codeProject],
    () => getProjectByCode(codeProject, requestOptions),
    { enabled: !!codeProject, refetchOnWindowFocus: false, retry: false }
  );

  const historial = useQuery(
    ["historialProject", codeProjectHistory],
    () => getHistorialProject(codeProjectHistory, requestOptions),
    { enabled: !!codeProjectHistory, refetchOnWindowFocus: false, retry: false }
  );

  const columns = [
    { name: "CODIGO", uid: "code" },
    { name: "TITULO", uid: "title" },
    { name: "ESTADO", uid: "status" },
    { name: "CALIFICACION", uid: "score" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleShowHistory = (code) => {
    setCodeProjectHistory(code);
  };

  const handler = (code) => {
    setCodeProject(code);
  };

  const resetCodeProject = () => {
    setCodeProject("");
  };

  const resetCodeProjectHistory = () => {
    setCodeProjectHistory("");
  };

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "title":
        return (
          <Container
            css={{
              width: "25rem",
              margin: "0",
              padding: "0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Text>{user.title}</Text>
          </Container>
        );
      case "status":
        return (
          <Container
            css={{
              width: "5rem",
              margin: "0",
              padding: "0",
            }}
          >
            <StyledBadge type={user.status}>{cellValue}</StyledBadge>
          </Container>
        );
      case "score":
        return <Text>{user.score}</Text>;

      case "actions":
        return (
          <Row justify="flex-start" align="center">
            <Col>
              <Tooltip content="Detalles">
                <IconButton id="details" onClick={() => handler(user.code)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
            <Col>
              <Tooltip content="Historial">
                <IconButton
                  id="history"
                  onClick={() => handleShowHistory(user.code)}
                >
                  <i className="bi bi-folder"></i>
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Container
      css={{
        paddingTop: "10px",
        width: "100%",
        height: "40rem",
        overflow: "hidden",
      }}
    >
      <h3>Lista de Proyectos</h3>
      <Col css={{ paddingTop: "10px", width: "90%", overflowY: "auto" }}>
        {isSuccess && data?.data != null ? (
          <Table
            aria-label="Example table with custom cells"
            css={{
              width: "95%",
              height: "70%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={data?.data || []}>
              {(item) => (
                <Table.Row key={item.code}>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={5} />
          </Table>
        ) : isLoading ? (
          <Loading type="points" />
        ) : isError ? (
          <Message
            type={"error"}
            title={"¡Ha ocurrido un error a la hora de cargar los proyectos!"}
          />
        ) : (
          ""
        )}
      </Col>
      {view.isSuccess ? (
        <DetailsDocument data={view.data.data} onClose={resetCodeProject} />
      ) : view.isError ? (
        <Message
          type={"error"}
          title={"¡Ha ocurrido un error al mostrar los detalles del proyecto!"}
        />
      ) : (
        ""
      )}
      {historial.isSuccess ? (
        <HistoryDocument
          data={historial.data.data}
          codeProject={codeProjectHistory}
          onClose={resetCodeProjectHistory}
        />
      ) : historial.isError ? (
        <Message
          type={"warning"}
          title={"No tiene experiencias registradas en proyecto"}
        />
      ) : (
        ""
      )}
      {professor.isError ? (
        <>
          <Message
            type={"warning"}
            title={
              "¡Por favor, completa tu hoja de vida para consultar los proyectos!"
            }
            message={
              "Si ya registraste tu hoja de vida, comunicate con el administrador para que te asigne el cargo como docente"
            }
          />
          {setTimeout(() => {
            navigate("..");
          }, 7000)}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
