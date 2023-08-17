import { Outlet } from "react-router-dom";
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
import { Badge } from "../../../assets/icons/Badge";
import { IconButton } from "../../../assets/icons//IconButton";
import Assignment from "../../../components/Assignment";
import { useState } from "react";
import AssignmentTutor from "../../../components/AssignmentTutor.jsx";
import { useQuery } from "react-query";
import Message from "../../../components/message";
import { getAllProject } from "../../../controllers/project";

export function ProjectAssignment() {
  return <Outlet />;
}

export function ProjectTable() {
  const [codeProject, setCodeProject] = useState("");
  const [codeProjectTutor, setCodeProjectTutor] = useState("");
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const token = JSON.parse(localStorage.getItem("userConfiguration"));

  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["getAllProject"],
    () => getAllProject(requestOptions),
    {
      refetchInterval: 19000,
    }
  );

  const handler = (code) => {
    setCodeProject(code);
    setIsOpenModal1(true);
  };

  const resetCodeProject = () => {
    setCodeProject("");
    setIsOpenModal1(false);
  };

  const handlerTutor = (code) => {
    setCodeProjectTutor(code);
    setIsOpenModal2(true);
  };

  const resetCodeProjectTutor = () => {
    setCodeProjectTutor("");
    setIsOpenModal2(false);
  };

  const columns = [
    { name: "CODIGO", uid: "code" },
    { name: "TITULO", uid: "title" },
    { name: "EVALUADOR", uid: "evaluator" },
    { name: "TUTOR", uid: "tutor" },
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
      case "evaluator":
        return (
          <Container
            css={{
              width: "5rem",
              margin: "0",
              padding: "0",
            }}
          >
            <Badge
              type={user.evaluatorDocument != null ? "Asignado" : "Pendiente"}
            >
              {user.evaluatorDocument != null ? "Asignado" : "Pendiente"}
            </Badge>
          </Container>
        );
      case "tutor":
        return (
          <Container
            css={{
              width: "5rem",
              margin: "0",
              padding: "0",
            }}
          >
            <Badge type={user.tutorDocument != null ? "Asignado" : "Pendiente"}>
              {user.tutorDocument != null ? "Asignado" : "Pendiente"}
            </Badge>
          </Container>
        );
      case "actions":
        return (
          <Row justify="flex-start" align="center">
            <Spacer x={1} />
            <Col>
              <Tooltip content="Asignar Evaluador" placement="topEnd">
                <IconButton onClick={() => handler(user.code)}>
                  <i class="bi bi-person-plus-fill"></i>
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.8} />
            <Col>
              <Tooltip content="Asignar Tutor" placement="topStart">
                <IconButton onClick={() => handlerTutor(user.code)}>
                  <i class="bi bi-person-lines-fill"></i>
                </IconButton>
              </Tooltip>
            </Col>
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
            title={"Ha ocurrido un error a la hora de cargar los proyectos"}
          />
        ) : (
          ""
        )}
      </Col>
      {isOpenModal1 ? (
        <Assignment
          isProposal={false}
          onClose={resetCodeProject}
          code={codeProject}
        />
      ) : (
        ""
      )}
      {isOpenModal2 ? (
        <AssignmentTutor
          isProposal={false}
          onClose={resetCodeProjectTutor}
          code={codeProjectTutor}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
