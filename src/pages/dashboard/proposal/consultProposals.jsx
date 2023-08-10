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
import { DeleteIcon } from "../../../assets/icons//DeleteIcon";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { IconButton } from "../../../assets/icons//IconButton";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../../data/user";
import { useQuery } from "react-query";
import {
  getProposalByDocument,
  deleteProposalByCode,
  getProposalByCode,
  getHistorialPropose,
} from "../../../controllers/proposal";
import Message from "../../../components/message";
import Details from "../../../components/Details";
import History from "../../../components/History";
import { getPerson } from "../../../controllers/person";
import { useNavigate } from "react-router-dom";
import { getResearchGroupCode } from "../../../controllers/lines";
export function ConsultProposal() {
  return <Outlet />;
}

export function ProposalsTable() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let user = getUser();
  const [code, setCode] = useState("");
  const [codeProposal, setCodeProposal] = useState("");
  const [codeProposalHistory, setCodeProposalHistory] = useState("");
  const [codeEvaluator, setCodeEvaluator] = useState("");
  const [codeTutor, setCodeTutor] = useState("");
  const [codeResearch, setCodeResearch] = useState("");
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["search"],
    () => getProposalByDocument(user.personDocument, requestOptions),
    {
      refetchInterval: 19000,
    }
  );

  const evaluator = useQuery(
    ["getEvaluator", codeEvaluator],
    () => getPerson(codeEvaluator, requestOptions),
    { enabled: !!codeEvaluator, refetchOnWindowFocus: false, retry: false }
  );

  const research = useQuery(
    ["codeResearch", codeResearch],
    () => getResearchGroupCode(codeResearch, requestOptions),
    { enabled: !!codeResearch, refetchOnWindowFocus: false, retry: false }
  );

  const tutor = useQuery(
    ["getTutor", codeTutor],
    () => getPerson(codeTutor, requestOptions),
    { enabled: !!codeTutor, refetchOnWindowFocus: false, retry: false }
  );

  const del = useQuery(
    ["delete", code],
    () => deleteProposalByCode(code, requestOptions),
    { enabled: !!code, refetchOnWindowFocus: false, retry: false }
  );

  const view = useQuery(
    ["view", codeProposal],
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

  const modifyProposal = (proposal) => {
    navigate(`modify-proposal/${proposal}`);
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

  const renderCell = (p, columnKey) => {
    const cellValue = p[columnKey];
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
            <Text>{p.title}</Text>
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
            <StyledBadge type={p.status}>{cellValue}</StyledBadge>
          </Container>
        );

      case "actions":
        return (
          <Row justify="flex-start" align="center">
            <Col>
              <Tooltip content="Detalles">
                <IconButton id="details" onClick={() => handler(p.code)}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
            <Col>
              <Tooltip
                content="Historial"
                onClick={() => handleShowHistory(p.code)}
              >
                <IconButton id="history">
                  <i className="bi bi-folder"></i>
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
            <Col>
              <Tooltip
                content="Modificar"
                onClick={() => modifyProposal(p.code)}
              >
                <IconButton id="modify">
                  <EditIcon size={20} />
                </IconButton>
              </Tooltip>
            </Col>
            <Spacer x={0.5} />
            <Col>
              <Tooltip
                content="Eliminar"
                color="error"
                onClick={() => setCode(p.code)}
              >
                <IconButton id="delete">
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
      setCodeResearch(view.data.data.investigationGroup);
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
      <h3>Mis Propuestas</h3>
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
                <Table.Row key={item.code} css={{ height: "15px" }}>
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
        <Details
          data={view.data?.data}
          onClose={resetCodeProposal}
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
          researchGroup={
            research.isSuccess && research.data != null
              ? research.data?.data.name
              : ""
          }
        />
      ) : view.isLoading ? (
        <Loading type="points" />
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
      {del.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Se ha eliminado correctamente la propuesta!"}
        />
      ) : del.isError ? (
        <Message
          type={"error"}
          title={"¡Ha ocurrido un error al eliminar la propuesta!"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
