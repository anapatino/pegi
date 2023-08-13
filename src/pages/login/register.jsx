import {
  Container,
  Input,
  Radio,
  Button,
  Spacer,
  Text,
  Col,
  Row,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Outlet, Link } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useMutation } from "react-query";
import Message from "../../components/message";

export function Register() {
  return <Outlet />;
}

export function RegisterUser() {
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
      name: "",
      password: "",
      role: "",
    });
  };

  const user = useMutation((user) => {
    return apiClient.post("auth/sign-up", user, requestOptions).then();
  });

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Row justify="space-between" align="center">
        <h3>Registrar Usuario</h3>
        <Row justify="flex-end" align="center" css={{ width: "50%" }}>
          <Button bordered color="primary" auto rounded>
            <Link to="docent/">Registrar docente</Link>
          </Button>
          <Spacer />
          <Button bordered color="primary" auto rounded>
            <Link to="student/">Registrar estudiante</Link>
          </Button>
        </Row>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Col css={{ paddingTop: "10px", width: "50%", overflowY: "auto" }}>
          <Col css={{ height: "7rem" }}>
            <Input
              {...register("name", {
                required: true,
                pattern: /^[a-zA-Z@.]+$/,
                maxLength: {
                  value: 30,
                  message: "Max 30 caracteres",
                },
              })}
              label="Correo"
              width="22rem"
              clearable
            />
            <Text css={{ fontSize: "0.85rem" }}>{errors.name?.message}</Text>
            {errors.name && errors.name.type === "pattern" && (
              <Text css={{ fontSize: "0.85rem" }}>solo Letras @ y .</Text>
            )}
          </Col>
          <Spacer y={3} />
          <Col css={{ height: "7rem" }}>
            <Input
              {...register("password", {
                required: true,
                maxLength: {
                  value: 30,
                  message: "Max 30 caracteres",
                },
              })}
              label="Contraseña"
              width="22rem"
              clearable
            />
            <Text css={{ fontSize: "0.85rem" }}>
              {errors.password?.message}
            </Text>
          </Col>
          <Spacer y={3} />
          <Col css={{ height: "7rem" }}>
            <Radio.Group
              value={watch("role")}
              onChange={(e) => setValue("role", e)}
              label="Seleccionar tipo:"
              orientation="horizontal"
              color="secondary"
            >
              <Radio value="Estudiante" size="sm">
                Estudiante
              </Radio>
              <Radio value="Docente" size="sm">
                Docente
              </Radio>
              <Radio value="Administrador" size="sm">
                Administrador
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
        <Message type={"success"} title={"Usuario creado correctamente"} />
      ) : user.isError ? (
        <Message type={"error"} title={"¡Error al crear usuario!"} />
      ) : (
        ""
      )}
    </Container>
  );
}
