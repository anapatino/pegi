import {
  Spacer,
  Col,
  Text,
  Input,
  Row,
  Button,
  Container,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Select } from "../../../styled-components/Select";
import { useQuery } from "react-query";
import { getAllLines } from "../../../controllers/lines";
import { Link } from "react-router-dom";
import apiClient from "../../../data/http-common";
import Message from "../../../components/message";
import { useMutation } from "react-query";

export default function RegisterResearchSubline() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const researchLineCode = watch("researchLineCode");

  const line = useQuery("linee", () => getAllLines(requestOptions), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const onSubmit = (data) => {
    const newSubline = {
      ...data,
      researchLineCode: researchLineCode,
    };
    sublines.mutate(newSubline);
    reset({
      code: "",
      name: "",
      researchLineCode: "",
    });
  };

  const sublines = useMutation((prop) => {
    return apiClient
      .post("research-sub-lines", prop, requestOptions)
      .then((res) => res.data);
  });

  return (
    <Container>
      <Col>
        <Row justify="space-between" align="center">
          <h3>Registrar Sublinea</h3>
          <Row justify="flex-end" align="center" css={{ width: "50%" }}>
            <Button bordered color="primary" auto rounded>
              <Link to="..">Volver</Link>
            </Button>
          </Row>
        </Row>
        <Spacer y={0.5} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row
            justify="flex-start"
            align="flex-start"
            css={{ width: "85%", overflow: "hidden" }}
          >
            <Col css={{ height: "6rem" }}>
              <Text>Linea de Investigacion:</Text>
              <Select {...register("researchLineCode", { required: true })}>
                {line.data !== undefined
                  ? line.data.data.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))
                  : ""}
              </Select>
            </Col>
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
      {sublines.isSuccess ? (
        <Message
          type={"success"}
          title={"SubLinea de investigacion registrada correctamente"}
        />
      ) : sublines.isError ? (
        <Message
          type={"error"}
          title={"Error al registrar subLinea de investigacion"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
