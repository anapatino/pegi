import {
  Modal,
  Text,
  Col,
  Row,
  Textarea,
  Spacer,
  Button,
  Container,
} from "@nextui-org/react";
import { Select } from "../styled-components/Select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormatDate } from "../data/formatData";
import { useMutation } from "react-query";
import apiClient from "../data/http-common";
import Message from "./message";

export default function Qualify(prop) {
  const [visible, setVisible] = useState(true);
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
  const closeModal = () => {
    setVisible(false);
  };

  const feedback = useMutation((prop) => {
    return apiClient
      .post("HistorialPropose/register-feedback", prop, requestOptions)
      .then((res) => res.data);
  });

  const onSubmit = (data) => {
    const date = FormatDate();
    const newProposal = {
      ...data,
      proposalCode: prop.codeProposal,
      date: date,
    };
    feedback.mutate(newProposal);
    reset({
      status: "",
      comment: "",
    });
    closeModal();
  };

  const options = [
    { value: "Corregir", label: "Corregir" },
    { value: "Aprobado", label: "Aprobado" },
    { value: "Rechazado", label: "Rechazado" },
  ];

  return (
    <Container>
      <Modal width="25rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <Text b id="modal-title" size={25}>
            Calificar Propuesta
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
                  onClick={() => {
                    prop.onClose();
                    setVisible(false);
                  }}
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
          title={
            "¡Propuesta " + prop.codeProposal + " calificada correctamente!"
          }
        />
      ) : feedback.isError ? (
        <Message
          type={"error"}
          title={"¡Error al calificar la Propuesta " + prop.codeProposal + " !"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
