import { Card, Text, Col, Row, Spacer } from "@nextui-org/react";
import { getUser } from "../../data/user";
import { useQuery } from "react-query";
import { getStatisticsProposalByStudent } from "../../controllers/proposal";
import { getStatisticsProjectByStudent } from "../../controllers/project";
import Image from "../../assets/images/woman.png";
import { ProgressBar } from "../../styled-components/Progress";
import Cards from "../../components/Card";
export const DashboardStudent = () => {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  let user = getUser();
  const proposal = useQuery(
    ["statistics", user],
    () => getStatisticsProposalByStudent(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const project = useQuery(
    ["statisticsproject", user],
    () => getStatisticsProjectByStudent(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const purple = "rgb(113, 77, 217)";

  return (
    <Row css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}>
      <Col css={{ width: "60%" }}>
        <Card css={{ $$cardColor: purple, height: "12rem" }}>
          <Row align="center" justify="center" css={{ height: "12rem" }}>
            <img
              src={Image}
              alt="imag"
              style={{ width: "200px", height: "auto", marginTop: "100px" }}
            />
            <Col css={{ marginLeft: "1px" }}>
              <Text b size={34} color="white">
                Bienvenido!
              </Text>
              <Text size={16} color="white">
                Explora todas las funcionalidades y características que hemos
                preparado para ti. ¡Disfruta de tu experiencia!
              </Text>
            </Col>
          </Row>
        </Card>
        <Spacer y={1.5} />
        {proposal.isSuccess && proposal.data.data !== null ? (
          <div>
            <Row
              justify="space-around"
              css={{
                width: "100%",
                margin: "0",
              }}
            >
              <Cards
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
                color={"primary"}
              />
              <Cards
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
                color={"primary"}
              />
            </Row>
          </div>
        ) : (
          ""
        )}
      </Col>
      <Spacer x={1.5} />
      <Col css={{ width: "30%" }}>
        {project.isSuccess && project.data.data !== null ? (
          <Row
            justify="space-between"
            align="center"
            css={{ width: "25rem", height: "12rem" }}
          >
            <Col
              align="center"
              css={{
                width: "11.5rem",
                height: "12rem",
                background: "#16181A",
                borderRadius: "25px",
                padding: "20px",
              }}
            >
              <ProgressBar
                content={
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
              />
              <Spacer y={0.2} />
              <Text weight="bold" size={18}>
                Proyectos Pendientes
              </Text>
            </Col>
            <Col
              justify="space-around"
              align="center"
              css={{
                width: "11.5rem",
                height: "12rem",
                background: "#16181A",
                borderRadius: "25px",
                padding: "20px",
              }}
            >
              <ProgressBar
                content={
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
              />
              <Spacer y={0.2} />
              <Text weight="bold" size={18}>
                Proyectos Aprobados
              </Text>
            </Col>
          </Row>
        ) : (
          ""
        )}
        <Spacer y={2.6} />
        {project.isSuccess && project.data.data !== null ? (
          <Row
            justify="space-between"
            align="center"
            css={{ width: "25rem", height: "13rem" }}
          >
            <Col
              align="center"
              css={{
                width: "11.5rem",
                height: "13rem",
                background: "#16181A",
                borderRadius: "25px",
                padding: "20px",
              }}
            >
              <ProgressBar
                content={
                  isNaN(project.data.data.total) ||
                  isNaN(project.data.data.corregir)
                    ? 0
                    : project.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (project.data.data.corregir / project.data.data.total) *
                          100
                      )
                }
              />
              <Spacer y={0.2} />
              <Text weight="bold" size={18}>
                Proyectos Corregidos
              </Text>
            </Col>
            <Col
              justify="space-around"
              align="center"
              css={{
                width: "11.5rem",
                height: "13rem",
                background: "#16181A",
                borderRadius: "25px",
                padding: "20px",
              }}
            >
              <ProgressBar
                content={
                  isNaN(project.data.data.total) ||
                  isNaN(project.data.data.rechazado)
                    ? 0
                    : project.data.data.total === 0
                    ? 0
                    : Math.floor(
                        (project.data.data.rechazado /
                          project.data.data.total) *
                          100
                      )
                }
              />
              <Spacer y={0.2} />
              <Text weight="bold" size={18}>
                Proyectos Rechazado
              </Text>
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Col>
    </Row>
  );
};
