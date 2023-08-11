import {
  Col,
  Container,
  Button,
  Spacer,
  Text,
  Input,
  Row,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FormContact } from "../../styled-components/Forms";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

export const Contact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(e) {
    // Configura tu cuenta de EmailJS
    emailjs.init("2s8mbqRtumEcqNnxj");

    emailjs
      .sendForm(
        "service_9bi8bhd",
        "template_7ruckjj",
        e.target,
        "2s8mbqRtumEcqNnxj"
      )
      .then((response) => {
        console.log("Correo electrónico enviado:", response);
      })
      .catch((error) => {
        console.error("Error al enviar el correo electrónico:", error);
      });
  }

  return (
    <Container
      css={{
        padding: "2rem 4rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Col>
        <Button
          color="secondary"
          rounded
          light
          css={{
            position: "absolute",
            top: "15%",
            left: "2%",
            fontSize: "$2xl",
          }}
          size={"md"}
          onPress={() => navigate("..")}
        >
          <i class="bi bi-arrow-left-circle-fill" Style="font-size: 30px;"></i>
        </Button>
        <Text
          h1
          size={140}
          css={{
            textGradient: "45deg, $blue600 -20%, $purple600 50%",
            letterSpacing: "3px",
            margin: "0",
            marginLeft: "25%",
          }}
          weight="black"
        >
          Contacto
        </Text>
        <FormContact onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Input
                {...register("name", {
                  required: true,
                  pattern: /^[a-zA-Z.]+$/,
                  maxLength: {
                    value: 30,
                    message: "Max 30 caracteres",
                  },
                })}
                width="15rem"
                css={{ margin: "0" }}
                underlined
                placeholder="Nombre"
                color="Default"
              />
              <Text css={{ fontSize: "0.9rem" }}>{errors.name?.message}</Text>
              {errors.name && errors.name.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras
                </Text>
              )}
            </Col>
            <Col>
              <Input
                {...register("email", {
                  required: true,
                  maxLength: {
                    value: 30,
                    message: "Max 30 caracteres",
                  },
                })}
                width="15rem"
                css={{ margin: "0" }}
                underlined
                placeholder="Correo"
                color="Default"
              />
              <Text css={{ fontSize: "0.9rem" }}>{errors.email?.message}</Text>
              {errors.email && errors.email.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras, numeros, @ y .
                </Text>
              )}
            </Col>
          </Row>
          <Spacer y={2} />
          <Col>
            <Input
              {...register("message", {
                required: true,
                maxLength: {
                  value: 30,
                  message: "Max 30 caracteres",
                },
              })}
              width="32.5rem"
              css={{ margin: "0" }}
              underlined
              placeholder="Mensaje"
              color="Default"
            />
            <Text css={{ fontSize: "0.9rem" }}>{errors.phone?.message}</Text>
            {errors.phone && errors.phone.type === "pattern" && (
              <Text css={{ fontSize: "0.85rem" }}>Solo se permiten letras</Text>
            )}
          </Col>
          <Button
            id="send"
            rounded
            type="submit"
            value="submit"
            shadow
            color="secondary"
            auto
            css={{
              width: "10rem",
              marginLeft: "20rem",
              marginTop: "3rem",
            }}
          >
            Enviar
          </Button>
        </FormContact>
      </Col>
    </Container>
  );
};
