import { ContainerMedium } from "../../styled-components/Containers";
import { FormMedium } from "../../styled-components/Forms";
import {
  Text,
  Input,
  Button,
  Loading,
  Modal,
  Spacer,
  Container,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../data/http-common";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../data/user";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  let openModal = (message) => {
    setError(message);
    handler();
  };
  const onSubmit = (data) => {
    query.mutate({ name: data.user, password: data.password });
  };

  const query = useMutation((auth) => {
    return apiClient
      .post("auth/login", auth)
      .then((res) => {
        if (res.status === 200) {
          saveUserConfiguration(res.data);
        }
      })
      .catch((res) => {
        let message = JSON.parse(res.request.response);
        if (message != null) {
          openModal(message.message);
        } else {
          openModal(res);
        }
      });
  });

  const saveUserConfiguration = (data) => {
    localStorage.setItem("userConfiguration", JSON.stringify(data));
    const user = getUser();
    const root =
      user.role === "Estudiante"
        ? "/dashboard/student/"
        : user.role === "Docente"
        ? "/dashboard/professor/"
        : "/dashboard/administrator/";
    navigate(root);
  };

  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        className="ingresarLogin"
        css={{
          position: "absolute",
          top: "5%",
          fontSize: "7rem",
          fontWeight: "bold",
        }}
      >
        INGRESAR
      </Text>
      <ContainerMedium>
        <FormMedium onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("user", {
              required: true,
              pattern: /^[a-zA-Z@.]+$/,
              maxLength: {
                value: 30,
                message: "Max 30 caracteres",
              },
            })}
            clearable
            bordered
            labelPlaceholder="Usuario"
            css={{
              width: "15rem",
              marginTop: "$10",
              marginButton: "10rem",
            }}
          />
          <Text css={{ fontSize: "0.9rem" }}>{errors.user?.message}</Text>
          {errors.user && errors.user.type === "pattern" && (
            <Text css={{ fontSize: "0.85rem" }}>
              Solo se permiten letras y @
            </Text>
          )}
          <Input.Password
            {...register("password", {
              required: true,
              maxLength: {
                value: 30,
                message: "Max 30 caracteres",
              },
            })}
            bordered
            labelPlaceholder="Contraseña"
            css={{
              width: "15rem",
              marginTop: "$16",
              marginButton: "10rem",
            }}
          />
          <Text css={{ fontSize: "0.9rem" }}>{errors.password?.message}</Text>
          <Button
            id="send"
            type="submit"
            value="submit"
            shadow
            color="secondary"
            auto
            css={{
              width: "10rem",
              margin: "2rem auto",
            }}
          >
            Ingresar
          </Button>
        </FormMedium>
        <div>
          {query.isLoading ? <Loading color="secondary" type="points" /> : null}
        </div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Spacer y={2} />
            <Text id="modal-title" size={18}>
              Error: {error}
            </Text>
          </Modal.Header>
          <Spacer y={0.9} />
        </Modal>
      </ContainerMedium>
    </Container>
  );
};
