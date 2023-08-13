import {
  Container,
  Text,
  Input,
  Radio,
  Button,
  Spacer,
  Col,
  Row,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useMutation } from "react-query";
import Message from "../../components/message";

export function RegisterDocent() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    user.mutate(data);
    reset({
      document: "",
      position: "",
    });
  };

  const user = useMutation((user) => {
    return apiClient
      .post("Professor", user, requestOptions)
      .then((res) => res.data);
  });

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Row justify="space-between" align="center">
        <h3>Registrar Docente</h3>
        <Button bordered color="primary" auto rounded>
          <Link to="..">Volver</Link>
        </Button>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Col css={{ paddingTop: "10px", width: "50%", overflowY: "auto" }}>
          <Col css={{ height: "7rem" }}>
            <Input
              {...register("document", {
                required: true,
                pattern: /^[0-9]+$/,
                minLength: {
                  value: 4,
                  message: "Min 4 numeros",
                },
                maxLength: {
                  value: 10,
                  message: "Max 10 numeros",
                },
              })}
              label="Documento"
              width="22rem"
              clearable
            />
            <Text css={{ fontSize: "0.85rem" }}>
              {errors.document?.message}
            </Text>
            {errors.document && errors.document.type === "pattern" && (
              <Text css={{ fontSize: "0.85rem" }}>
                Solo se permiten numeros
              </Text>
            )}
          </Col>
          <Spacer y={3} />
          <Col css={{ height: "7rem" }}>
            <Radio.Group
              value={watch("position")}
              onChange={(e) => setValue("position", e)}
              label="Seleccionar tipo:"
              orientation="horizontal"
              color="secondary"
            >
              <Radio value="tutor" size="sm">
                Tutor
              </Radio>
              <Radio value="evaluator" size="sm">
                Evaluador
              </Radio>
            </Radio.Group>
          </Col>
          <Spacer y={2} />
          <Button
            type="submit"
            color="secondary"
            autoFocus="false"
            size="sm"
            rounded
            css={{ margin: "0.5rem" }}
          >
            Guardar
          </Button>
        </Col>
      </form>
      {user.isSuccess ? (
        <Message type={"success"} title={"Docente creado correctamente"} />
      ) : user.isError ? (
        <Message type={"error"} title={"¡Error al crear Docente!"} />
      ) : (
        ""
      )}
    </Container>
  );
}
