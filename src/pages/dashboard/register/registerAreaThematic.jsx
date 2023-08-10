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
import { getAllLines, getSubline } from "../../../controllers/lines";
import { Link } from "react-router-dom";
import apiClient from "../../../data/http-common";
import Message from "../../../components/message";
import { useMutation } from "react-query";

export default function RegisterAreaThematic() {
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
  const codeLine = watch("codeLine");
  const researchSublineCode = watch("researchSublineCode");

  const line = useQuery("linees", () => getAllLines(requestOptions), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const subline = useQuery(
    ["sublines", codeLine],
    () => getSubline(codeLine, requestOptions),
    { enabled: !!codeLine, refetchOnWindowFocus: false, retry: false }
  );

  const onSubmit = (data) => {
    delete data.codeLine;
    delete data.lineCode;
    const newArea = {
      ...data,
      researchSublineCode: researchSublineCode,
    };
    area.mutate(newArea);
    console.log(newArea);
    reset({
      code: "",
      name: "",
      codeLine: "",
      researchSublineCode: "",
    });
  };

  const area = useMutation((prop) => {
    return apiClient
      .post("Thematic-areas", prop, requestOptions)
      .then((res) => res.data);
  });

  return (
    <Container>
      <Col>
        <Row justify="space-between" align="center">
          <h3>Registrar Area Tematica</h3>
          <Row justify="flex-end" align="center" css={{ width: "50%" }}>
            <Button bordered color="primary" auto rounded>
              <Link to="..">Volver</Link>
            </Button>
          </Row>
        </Row>
        <Spacer y={0.5} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="flex-start" align="center" css={{ width: "35rem" }}>
            <Col css={{ height: "6rem" }}>
              <Text>Linea de Investigacion:</Text>
              <Select {...register("codeLine", { required: true })}>
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
              <Text>Sublinea de investigacion:</Text>
              <Select {...register("researchSublineCode", { required: true })}>
                {subline.data !== undefined
                  ? subline.data.data.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))
                  : ""}
              </Select>
            </Col>
          </Row>
          <Spacer y={0.5} />
          <Row justify="flex-start" align="center" css={{ width: "35rem" }}>
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
                width="14rem"
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
      {area.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Area Tematica Registrada correctamente!"}
        />
      ) : area.isError ? (
        <Message type={"error"} title={"Error al Registrar Area Tematica."} />
      ) : (
        ""
      )}
    </Container>
  );
}
