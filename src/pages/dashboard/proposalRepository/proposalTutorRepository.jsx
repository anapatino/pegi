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
  getProposalByCode,
  getHistorialPropose,
  getProposalByProfessorDocument,
} from "../../../controllers/proposal";
import { getProfessorByDocument } from "../../../controllers/professor";
import Message from "../../../components/message";
import History from "../../../components/History";
import Details from "../../../components/Details";

export function ProposalTutorRepository() {
  return <Outlet />;
}

export function ProposalsTutorTableRepository() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));

  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let user = getUser();

  const [codeProposal, setCodeProposal] = useState("");
  const [codeProposalHistory, setCodeProposalHistory] = useState("");

  const professor = useQuery(
    ["searchProfessor", user],
    () => getProfessorByDocument(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["getAllProposalsProfessor"],
    () => getProposalByProfessorDocument(user.personDocument, requestOptions),
    {
      refetchInterval: 19000,
    }
  );

  const view = useQuery(
    ["viewProposal", codeProposal],
    () => getProposalByCode(codeProposal, requestOptions),
    { enabled: !!codeProposal, refetchOnWindowFocus: false, retry: false }
  );

  const historial = useQuery(
    ["historialProposal", codeProposalHistory],
    () => getHistorialPropose(codeProposalHistory, requestOptions),
    {
      enabled: !!codeProposalHistory,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const handleShowHistory = (code) => {
    setCodeProposalHistory(code);
  };

  const handler = (code) => {
    setCodeProposal(code);
  };

  const resetCodeProposal = () => {
    setCodeProposal("");
  };

  const resetCodeProposalHistory = () => {
    setCodeProposalHistory("");
  };

  const columns = [
    { name: "CODIGO", uid: "code" },
    { name: "NOMBRE", uid: "title" },
    { name: "ESTADO", uid: "status" },
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
      <h3>Lista de Propuestas</h3>
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
            title={"¡Ha ocurrido un error a la hora de cargar las propuestas!"}
          />
        ) : (
          ""
        )}
      </Col>
      {view.isSuccess ? (
        <Details data={view.data.data} onClose={resetCodeProposal} />
      ) : view.isError ? (
        <Message
          type={"error"}
          title={
            "¡Ha ocurrido un error al mostrar los detalles de la propuesta!"
          }
        />
      ) : (
        ""
      )}
      {historial.isSuccess ? (
        <History
          data={historial.data.data}
          codeProposal={codeProposalHistory}
          onClose={resetCodeProposalHistory}
        />
      ) : historial.isError ? (
        <Message
          type={"warning"}
          title={"No tiene experiencias registradas en propuesta"}
        />
      ) : (
        ""
      )}
      {professor.isError ? (
        <Message
          type={"warning"}
          title={
            "¡Por favor, completa tu hoja de vida para consultar las propuestas!"
          }
          message={
            "Si ya registraste tu hoja de vida, comunicate con el administrador para que te asigne el rol como docente"
          }
        />
      ) : (
        ""
      )}
    </Container>
  );
}
