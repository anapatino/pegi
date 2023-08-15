import {
  Table,
  useModal,
  Button,
  Modal,
  Row,
  Loading,
  Container,
  Col,
  Tooltip,
  Text,
  Spacer,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Select } from "../../../styled-components/Select";
import { StyledBadge } from "../../../assets/icons/StyledBadge";
import { useForm } from "react-hook-form";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { IconButton } from "../../../assets/icons/IconButton";
import { getUser } from "../../../data/user";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  getProjectByProfessorDocument,
  getProjectByCode,
  getHistorialProject,
} from "../../../controllers/project";
import { getProfessorByDocument } from "../../../controllers/professor";
import Message from "../../../components/message";
import apiClient from "../../../data/http-common";
import DetailsDocument from "../../../components/DetailsDocument";
import HistoryDocument from "../../../components/HistoryDocument";

export function ProjectRepository() {
  return <Outlet />;
}

export function ProjectTableRepository() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let user = getUser();
  const { setVisible: setVisibleModal2, bindings: modal2Bindings } = useModal();
  const [codeProjectFeedback, setCodeProjectFeedback] = useState("");
  const [codeProject, setCodeProject] = useState("");
  const [codeProjectHistory, setCodeProjectHistory] = useState("");

  const professor = useQuery(
    ["searchProfessor", user],
    () => getProfessorByDocument(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["getAllProyectByProfessor"],
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

  const feedback = useMutation((prop) => {
    return apiClient
      .post("HistorialProject/register-feedback", prop, requestOptions)
      .then((res) => res.data);
  });

  const onSubmit = (data) => {
    const intNumber = parseInt(data.score);
    delete data.score;
    const newProject = {
      ...data,
      projectCode: codeProjectFeedback,
      score: intNumber,
    };
    feedback.mutate(newProject);
    reset({
      status: "",
      score: "",
      comment: "",
    });
    setVisibleModal2(false);
  };

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

  const options = [
    { value: "Corregir", label: "Corregir" },
    { value: "Aprobado", label: "Aprobado" },
    { value: "Rechazado", label: "Rechazado" },
  ];

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
              <Tooltip content="Calificar">
                <IconButton
                  id="qualify"
                  onClick={() => {
                    setVisibleModal2(true);
                    setCodeProjectFeedback(user.code);
                  }}
                >
                  <EditIcon size={20} />
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
      <Modal width="25rem" {...modal2Bindings}>
        <Modal.Header>
          <Text b id="modal-title" size={25}>
            Calificar Proyecto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Col>
              <Row align="center">
                <Text css={{ fontSize: "1rem", marginRight: "8px" }}>
                  Estado :
                </Text>
                <Select {...register("status", { required: true })}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </Row>
              <Spacer y={2} />
              <Col css={{ height: "7rem" }}>
                <Input
                  {...register("score", {
                    required: true,
                  })}
                  clearable
                  bordered
                  label="Calificacion"
                  width="15rem"
                  type="number"
                />
                <Text css={{ fontSize: "0.85rem" }}>
                  {errors.score?.message}
                </Text>
                {errors.score && errors.score.type === "pattern" && (
                  <Text css={{ fontSize: "0.85rem" }}>solo valores [0-5]</Text>
                )}
              </Col>
              <Spacer y={2} />
              <Textarea
                {...register("comment", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 500,
                    message: "Max 500 caracteres",
                  },
                })}
                label="Comentarios"
                clearable
                bordered
                color="secondary"
                status="default"
                rows={5}
                css={{ width: "22rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.comment?.message}
              </Text>
              {errors.comment && errors.comment.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras y espacios
                </Text>
              )}
              <Spacer y={2} />
              <Row justify="flex-end" align="center">
                <Button
                  id="closeQualify"
                  bordered
                  color="error"
                  auto
                  onClick={() => setVisibleModal2(false)}
                >
                  cerrar
                </Button>
                <Spacer x={0.5} />
                <Button auto id="submit" type="submit" color="secondary">
                  Guardar
                </Button>
              </Row>
            </Col>
          </form>
        </Modal.Body>
      </Modal>
      {feedback.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Proyecto " + codeProject + " calificado correctamente!"}
        />
      ) : feedback.isError ? (
        <Message
          type={"error"}
          title={"¡Error al calificar la Proyecto " + codeProject + " !"}
        />
      ) : (
        ""
      )}
      {professor.isError ? (
        <Message
          type={"warning"}
          title={
            "¡Por favor, completa tu hoja de vida para consultar los proyectos!"
          }
          message={
            "Si ya registraste tu hoja de vida, comunicate con el administrador para que te asigne el cargo como docente"
          }
        />
      ) : (
        ""
      )}
    </Container>
  );
}
