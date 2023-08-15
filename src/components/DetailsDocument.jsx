import {
  Button,
  Modal,
  Col,
  Spacer,
  Text,
  Row,
  Container,
} from "@nextui-org/react";
import { StyledBadge } from "../assets/icons/StyledBadge";
import { useState } from "react";

export default function DetailsDocument(prop) {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Modal scroll width="40rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <h2>Detalles del documento</h2>
        </Modal.Header>
        <Modal.Body>
          <Col css={{ paddingLeft: "0.4rem", paddingRigth: "0.4rem" }}>
            <Row>
              {prop.tutor != null ? (
                <Row align="center">
                  <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                    Tutor:
                  </Text>
                  <Spacer x={0.5} />
                  <Text css={{ letterSpacing: "1px" }}> {prop.tutor}</Text>
                </Row>
              ) : (
                ""
              )}
              {prop.evaluator != null ? (
                <Row align="center">
                  <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                    Evaluador:
                  </Text>
                  <Spacer x={0.5} />
                  <Text css={{ letterSpacing: "1px" }}> {prop.evaluator}</Text>
                </Row>
              ) : (
                ""
              )}
            </Row>
            <Spacer y={1} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Codigo Propuesta:
              </Text>
              <Spacer x={0.5} />
              <Text weight="light" css={{ letterSpacing: "1px" }} size={18}>
                {prop.data.proposalCode}
              </Text>
            </Row>
            <Spacer y={1} />
            <Row>
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Titulo:
                </Text>
                <Spacer x={0.5} />
                <Text weight="light" css={{ letterSpacing: "1px" }} size={18}>
                  {prop.data.title}
                </Text>
              </Row>
            </Row>
            <Spacer y={1} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Estado:
              </Text>
              <Spacer x={0.5} />
              <StyledBadge type={prop.data.status}>
                {prop.data.status}
              </StyledBadge>
            </Row>
            <Spacer y={1} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Calificacion:
              </Text>
              <Spacer x={0.5} />
              <Text> {prop.data.score}</Text>
            </Row>
            <Spacer y={0.5} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Descargar documento
            </Text>
            <a
              href={`data:application/pdf;base64,${prop.data.content}`}
              download
            >
              <Button
                size={"md"}
                css={{ marginTop: "1rem", letterSpacing: "1px" }}
              >
                Descargar
              </Button>
            </a>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="closeDetails"
            auto
            flat
            color="error"
            onClick={() => {
              prop.onClose();
              setVisible(false);
            }}
          >
            cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
