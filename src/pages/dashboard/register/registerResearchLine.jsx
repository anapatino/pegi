import {
  Container,
  Spacer,
  Col,
  Text,
  Input,
  Row,
  Button,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Outlet, Link } from "react-router-dom";
import apiClient from "../../../data/http-common";
import Message from "../../../components/message";

export function RegisterLines() {
  return <Outlet />;
}

export function RegisterResearchLines() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    lines.mutate(data);
    reset({
      code: "",
      name: "",
    });
  };

  const lines = useMutation((prop) => {
    return apiClient
      .post("research-lines", prop, requestOptions)
      .then((res) => res.data);
  });

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Col>
        <Row justify="space-between" align="center">
          <h3>Registrar Lineas</h3>
          <Row justify="flex-end" align="center" css={{ width: "50%" }}>
            <Button bordered color="primary" auto rounded>
              <Link to="subline/">Registrar Sublinea</Link>
            </Button>
            <Spacer />
            <Button bordered color="primary" auto rounded>
              <Link to="area-thematic/">Registrar Area tematica</Link>
            </Button>
          </Row>
        </Row>
        <Spacer y={0.5} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="flex-start" align="flex-start" css={{ width: "60%" }}>
            <Col css={{ height: "6rem" }}>
              <Input
                {...register("code", {
                  required: true,
                  pattern: /^[0-9]+$/,
                  maxLength: {
                    value: 10,
                    message: "Max 10 numeros",
                  },
                })}
                clearable
                label="Codigo"
                width="14rem"
              />
              <Text css={{ fontSize: "0.85rem" }}>{errors.code?.message}</Text>
              {errors.code && errors.code.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten numeros
                </Text>
              )}
            </Col>
            <Col css={{ height: "6rem" }}>
              <Input
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 60,
                    message: "Max 60 caracteres",
                  },
                })}
                clearable
                label="Nombre"
                width="24rem"
              />
              <Text css={{ fontSize: "0.85rem" }}>{errors.name?.message}</Text>
              {errors.name && errors.name.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras y espacios
                </Text>
              )}
            </Col>
          </Row>
          <Spacer y={1} />
          <Button
            type="submit"
            color="secondary"
            autoFocus="false"
            rounded
            size="sm"
          >
            Guardar
          </Button>
        </form>
      </Col>
      {lines.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Linea de Investigacion Registrada correctamente!"}
        />
      ) : lines.isError ? (
        <Message
          type={"error"}
          title={"Error al Registrar Linea de Investigacion."}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
