import {
  Table,
  Row,
  Spacer,
  Container,
  Loading,
  Col,
  Tooltip,
  Text,
} from "@nextui-org/react";
import { StyledBadge } from "../../../assets/icons/StyledBadge";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { IconButton } from "../../../assets/icons/IconButton";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Message from "../../../components/message";
import { getUser } from "../../../data/user";
import {
  getProjectByDocument,
  deleteProjectByCode,
  getProjectByCode,
  getHistorialProject,
} from "../../../controllers/project";
import DetailsDocument from "../../../components/DetailsDocument";
import HistoryDocument from "../../../components/HistoryDocument";
import { getPerson } from "../../../controllers/person";

export function ConsultProject() {
  return <Outlet />;
}

export function ProjectsTable() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const user = getUser();
  const [code, setCode] = useState("");
  const [codeProject, setCodeProject] = useState("");
  const [codeProjectHistory, setCodeProjectHistory] = useState("");
  const [codeEvaluator, setCodeEvaluator] = useState("");
  const [codeTutor, setCodeTutor] = useState("");

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["search"],
    () => getProjectByDocument(user.personDocument, requestOptions),
    {
      refetchInterval: 19000,
    }
  );

  const del = useQuery(
    ["delete", code],
    () => deleteProjectByCode(code, requestOptions),
    { enabled: !!code, refetchOnWindowFocus: false, retry: false }
  );

  const view = useQuery(
    ["view", codeProject],
    () => getProjectByCode(codeProject, requestOptions),
    { enabled: !!codeProject, refetchOnWindowFocus: false }
  );

  const historial = useQuery(
    ["historialProject", codeProjectHistory],
    () => getHistorialProject(codeProjectHistory, requestOptions),
    { enabled: !!codeProjectHistory, refetchOnWindowFocus: false }
  );

  const evaluator = useQuery(
    ["getEvaluator", codeEvaluator],
    () => getPerson(codeEvaluator, requestOptions),
    { enabled: !!codeEvaluator, refetchOnWindowFocus: false, retry: false }
  );

  const tutor = useQuery(
    ["getTutor", codeTutor],
    () => getPerson(codeTutor, requestOptions),
    { enabled: !!codeTutor, refetchOnWindowFocus: false, retry: false }
  );

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

  const columns = [
    { name: "CODIGO", uid: "code" },
    { name: "TITULO", uid: "title" },
    { name: "ESTADO", uid: "status" },
    { name: "CALIFICACION", uid: "score" },
    { name: "ACTIONS", uid: "actions" },
  ];

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
            <Col>
              <Tooltip content="Eliminar" color="error">
                <IconButton id="delete" onClick={() => setCode(user.code)}>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  useEffect(() => {
    if (view.isSuccess) {
      setCodeEvaluator(view.data.data.evaluatorDocument);
      setCodeTutor(view.data.data.tutorDocument);
    }
  }, [view.isSuccess]);

  return (
    <Container
      css={{
        paddingTop: "10px",
        width: "100%",
        height: "40rem",
        overflow: "hidden",
      }}
    >
      <h3>Mis Proyectos</h3>
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
                  align={"start"}
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
            title={"¡Ha ocurrido un error a la hora de cargar los documentos!"}
          />
        ) : (
          ""
        )}
      </Col>
      {view.isSuccess ? (
        <DetailsDocument
          data={view.data.data}
          onClose={resetCodeProject}
          evaluator={
            evaluator.isSuccess && evaluator.data != null
              ? evaluator.data?.data.firstName +
                " " +
                evaluator.data?.data.firstLastName
              : ""
          }
          tutor={
            tutor.isSuccess && tutor.data != null
              ? tutor.data?.data.firstName +
                " " +
                tutor.data?.data.firstLastName
              : ""
          }
        />
      ) : view.isLoading ? (
        <Loading type="points" />
      ) : view.isError ? (
        <Message
          type={"error"}
          title={"¡Ha ocurrido un error al mostrar el documento!"}
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
      {del.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Se ha eliminado correctamente el documento!"}
        />
      ) : del.isError ? (
        <Message
          type={"error"}
          title={"¡Ha ocurrido un error al eliminar el documento!"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
