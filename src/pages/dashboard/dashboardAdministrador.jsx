import {
  Text,
  Col,
  Row,
  Spacer,
  Container,
  Input,
  Button,
  Loading,
} from "@nextui-org/react";
import { useQuery, useMutation } from "react-query";
import { getUser } from "../../data/user";
import { useForm } from "react-hook-form";
import { getAllMessages } from "../../controllers/message";
import apiClient from "../../data/http-common";
import { FormatDate } from "../../data/formatData";
import CardPrincipal from "../../components/CardPrincipal";
import { getStatisticsProposal } from "../../controllers/proposal";
import { getStatisticsProject } from "../../controllers/project";

export const DashboardAdministrador = () => {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const user = getUser();
  const { register, handleSubmit, reset } = useForm();

  const messages = useQuery(
    ["messages"],
    () => getAllMessages(requestOptions),
    { refetchOnWindowFocus: false, retry: false, refetchInterval: 8000 }
  );

  const newMessage = useMutation((message) => {
    return apiClient
      .post("messages", message, requestOptions)
      .then((res) => res.data);
  });

  const proposal = useQuery(
    ["statistics"],
    () => getStatisticsProposal(requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  const project = useQuery(
    ["statisticsproject"],
    () => getStatisticsProject(requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  const onSubmit = (data) => {
    const date = FormatDate();
    const { message, ...newData } = data;
    const newMessa = {
      ...newData,
      date: date,
      name: user.userName,
    };
    newMessage.mutate(newMessa);
    reset({ content: "" });
  };

  return (
    <Row
      css={{
        paddingTop: "10px",
        height: "40rem",
        overflow: "hidden",
      }}
    >
      <Col
        css={{
          width: "65%",
          height: "30rem",
          background: "#16181A",
          borderRadius: "2rem",
          padding: "1rem 2.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "self-start",
        }}
      >
        <Text b size={25}>
          Mi Portafolio
        </Text>
        {proposal.isSuccess &&
        project.isSuccess &&
        proposal.data.data !== null &&
        project.data.data !== null ? (
          <div>
            <Row
              justify="space-around"
              css={{
                width: "40rem",
                margin: "0",
              }}
            >
              <CardPrincipal
                title={"Propuestas Pendientes"}
                value={
                  isNaN(proposal.data.data.total) ||
                  isNaN(proposal.data.data.pendiente)
                    ? 0
                    : proposal.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (proposal.data.data.pendiente /
                          proposal.data.data.total) *
                          100
                      )
                }
                color={"success"}
              />
              <CardPrincipal
                title={"Propuestas Aprobadas"}
                value={
                  isNaN(proposal.data.data.total) ||
                  isNaN(proposal.data.data.aprobado)
                    ? 0
                    : proposal.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (proposal.data.data.aprobado /
                          proposal.data.data.total) *
                          100
                      )
                }
                color={"success"}
              />
            </Row>
            <Row
              justify="space-around"
              css={{
                width: "40rem",
                margin: "0",
              }}
            >
              <CardPrincipal
                title={"Proyectos Pendientes"}
                value={
                  isNaN(project.data.data.total) ||
                  isNaN(project.data.data.pendiente)
                    ? 0
                    : project.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (project.data.data.pendiente /
                          project.data.data.total) *
                          100
                      )
                }
                color={"primary"}
              />
              <CardPrincipal
                title={"Proyectos Aprobadas"}
                value={
                  isNaN(project.data.data.total) ||
                  isNaN(project.data.data.aprobado)
                    ? 0
                    : project.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (project.data.data.aprobado / project.data.data.total) *
                          100
                      )
                }
                color={"primary"}
              />
            </Row>
          </div>
        ) : project.isLoading && proposal.isLoading ? (
          <Container css={{ marginTop: "2.5rem" }}>
            <Loading type="points" />
          </Container>
        ) : (
          ""
        )}
      </Col>
      <Spacer x={1.5} />
      <Col align="flex-start" css={{ width: "35%", overflow: "hidden" }}>
        <Text b size={20}>
          Bandeja de Mensajes
        </Text>
        <Container
          css={{
            height: "21rem",
            borderTop: "1px solid white",
            marginTop: "2rem",
            overflowY: "scroll",
            padding: "0",
          }}
        >
          {messages.isSuccess && messages.data != null
            ? messages.data.data.map((message) => {
                if (message.personDocument === user.personDocument) {
                  return (
                    <Container
                      justify="flex-start"
                      key={message.code}
                      css={{
                        maxWidth: "16rem",
                        background: "$success",
                        borderRadius: "10px",
                        margin: "0.8rem 0",
                        marginLeft: "6.5rem",
                        paddingTop: " 0.5rem",
                        paddingBottom: " 0.5rem",
                        textAlign: "right",
                      }}
                    >
                      <Text css={{ fontSize: "0.91rem" }}>
                        {message.content}
                      </Text>
                    </Container>
                  );
                } else {
                  return (
                    <Container
                      key={message.code}
                      css={{
                        width: "16rem",
                        borderRadius: "10px",
                        background: "#16181A",
                        margin: "0.8rem 0",
                        paddingTop: " 0.5rem",
                        paddingBottom: " 0.5rem",
                      }}
                    >
                      <Text css={{ fontSize: "0.91rem", fontWeight: "$bold" }}>
                        {message.name}
                      </Text>
                      <Text css={{ fontSize: "0.91rem" }}>
                        {message.content}
                      </Text>
                    </Container>
                  );
                }
              })
            : "No hay comentarios"}
        </Container>
        <Container
          css={{
            height: "6rem",
            marginTop: "1rem",
            padding: "0",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row justify="center" align="center">
              <Input
                clearable
                placeholder="Comentarios"
                width="20rem"
                css={{ marginTop: "1rem" }}
                {...register("content", {
                  required: true,
                })}
              ></Input>
              <Button
                type="submit"
                color="secondary"
                autoFocus="false"
                size="xs"
                css={{ height: "2.2rem", marginTop: "15px" }}
              >
                Guardar
              </Button>
            </Row>
          </form>
        </Container>
      </Col>
    </Row>
  );
};
