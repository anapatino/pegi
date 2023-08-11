import { Col, Container, Row, Spacer, Text } from "@nextui-org/react";
import Image from "../../assets/images/pegito@1-1366x629.jpg";

export const About = () => {
  return (
    <Container
      css={{
        padding: "2rem 4rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Col>
        <Text
          h1
          size={55}
          css={{
            margin: "0",
            textGradient: "45deg, $blue600 -20%, $purple600 50%",
            letterSpacing: "3px",
          }}
          weight="bold"
        >
          Acerca de PEGI:
        </Text>
        <Text h1 size={45} weight="medium">
          Plataforma de Gestión de Proyectos de Investigación.
        </Text>
        <Text size={20} weight="light" css={{ width: "55rem" }}>
          ¿Estás cansado de lidiar con montones de papeleo y confusiones
          interminables en tus proyectos de investigación? ¡No busques más!
          Hemos destilado años de sabiduría en una plataforma virtual que te
          hará preguntarte cómo has sobrevivido sin ella.
        </Text>
      </Col>
      <Spacer y={1.5} />
      <Row justify="space-between" align="center">
        <Col css={{ width: "50%" }}>
          <img
            src={Image}
            alt="imag"
            style={{ width: "40rem", height: "auto" }}
          />
        </Col>
        <Col css={{ width: "50%" }}>
          <Text
            h1
            size={45}
            css={{
              margin: "0",
              textGradient: "45deg, $blue600 -20%, $purple600 50%",
              letterSpacing: "3px",
            }}
            weight="bold"
          >
            Nuestro Proposito
          </Text>
          <Spacer y={0.2} />
          <Text size={20} weight="light">
            En PEGI, revolucionamos la gestión de proyectos de investigación,
            liberando a la comunidad académica de cargas administrativas. Con
            módulos personalizados para estudiantes, docentes y administradores,
            liberamos el poder de la innovación y el conocimiento, liberándote
            de preocupaciones burocráticas.
          </Text>
        </Col>
      </Row>
      <Spacer y={3} />
      <Text h1 size={45} weight="bold" css={{ letterSpacing: "3px" }}>
        Ventajas
      </Text>
      <Spacer y={4} />
      <Row css={{ height: "35rem" }}>
        <Cards
          icon={"bi bi-lightning-charge-fill"}
          text={"Acelera la revisión de documentos en línea"}
        ></Cards>
        <Cards
          icon={"bi bi-people-fill"}
          text={"Une a equipos de investigación sin importar la ubicación"}
        ></Cards>
        <Cards
          icon={"bi bi-search"}
          text={"Seguimiento en tiempo real para intervenciones rápidas"}
        ></Cards>
        <Cards
          icon={"bi bi-person-fill-gear"}
          text={"Simplifica la distribución de evaluadores."}
        ></Cards>
      </Row>
    </Container>
  );
};

function Cards({ icon, text }) {
  return (
    <Container
      css={{
        background: "linear-gradient(45deg, $purple600 -10%, $blue600 90%)",
        height: "15rem",
        width: "15rem",
        borderRadius: "2rem",
        padding: "1.5rem",
      }}
    >
      <Col align="center">
        <i class={icon} Style="font-size: 50px;"></i>
        <Spacer y={0.3} />
        <Text size={20} weight="medium">
          {text}
        </Text>
      </Col>
    </Container>
  );
}
