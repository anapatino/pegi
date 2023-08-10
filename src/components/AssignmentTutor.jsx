import {
  Container,
  Modal,
  Text,
  Spacer,
  Col,
  Row,
  Button,
} from "@nextui-org/react";
import { Select } from "../styled-components/Select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQuery } from "react-query";
import { updateProposalTutor } from "../controllers/proposal";
import { getProfessorByPosition } from "../controllers/professor";
import Message from "./message";
import { updateProjectTutor } from "../controllers/project";

export default function Assignment(prop) {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));

  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { register, handleSubmit, reset } = useForm();
  const [visible, setVisible] = useState(true);
  const [updateProposal, setUpdateProposal] = useState("");
  const [updateProject, setUpdateProject] = useState("");

  const closeModal = () => {
    setVisible(false);
  };

  const professors = useQuery(
    ["getAllProfessors"],
    () => getProfessorByPosition("tutor", requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  const proposal = useQuery(
    ["updateEvaluatorProposal", updateProposal],
    () => updateProposalTutor(updateProposal, requestOptions),
    { enabled: !!updateProposal, refetchOnWindowFocus: false, retry: false }
  );

  const project = useQuery(
    ["updateEvaluatorProject", updateProject],
    () => updateProjectTutor(updateProject, requestOptions),
    { enabled: !!updateProject, refetchOnWindowFocus: false, retry: false }
  );

  const onSubmit = (data) => {
    delete data.status;
    const newData = {
      ...data,
      code: prop.code,
    };
    if (prop.isProposal) {
      setUpdateProposal(newData);
    } else {
      setUpdateProject(newData);
    }

    reset({
      professorDocument: "",
    });
    closeModal();
  };

  return (
    <Container>
      {professors.isSuccess ? (
        <Modal scroll width="25rem" open={visible} onClose={closeModal}>
          <Modal.Header>
            <Text b id="modal-title" size={25}>
              Asignar Tutor
            </Text>
          </Modal.Header>
          <Spacer y={0.4} />
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Col>
                <Row align="center">
                  <Text css={{ fontSize: "1rem", marginRight: "8px" }}>
                    Docentes :
                  </Text>
                  <Select
                    {...register("professorDocument", { required: true })}
                  >
                    {professors.data.data.map((option) => (
                      <option key={option.document} value={option.document}>
                        {option.firstName + " " + option.firstLastName}
                      </option>
                    ))}
                  </Select>
                </Row>
                <Spacer y={3} />
                <Row justify="flex-end" align="center">
                  <Button
                    bordered
                    color="error"
                    auto
                    onClick={() => {
                      prop.onClose();
                      setVisible(false);
                    }}
                  >
                    cerrar
                  </Button>
                  <Spacer x={0.5} />
                  <Button auto type="submit" color="secondary">
                    Guardar
                  </Button>
                </Row>
              </Col>
            </form>
          </Modal.Body>
        </Modal>
      ) : professors.isError ? (
        <Message
          type={"warning"}
          title={"¡Ha ocurrido un error al cargar los docentes evaluadores!"}
          message={"puede que no haya evaluadores registrados"}
        />
      ) : (
        ""
      )}
      {proposal.isSuccess ? (
        <Message
          type={"success"}
          title={"Tutor asignado correctamente a la Propuesta!"}
        />
      ) : proposal.isError ? (
        <Message
          type={"error"}
          title={"¡Error al asignar tutor a la propuesta!"}
        />
      ) : (
        ""
      )}
      {project.isSuccess ? (
        <Message
          type={"success"}
          title={"Tutor asignado correctamente al proyecto!"}
        />
      ) : project.isError ? (
        <Message
          type={"error"}
          title={"¡Error al asignar tutor al proyecto!"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
