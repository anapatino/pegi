import {
  Container,
  Modal,
  Col,
  Text,
  Row,
  Spacer,
  Button,
} from "@nextui-org/react";
import { StyledBadge } from "../assets/icons/StyledBadge";
import { useState } from "react";

export default function Details(prop) {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Container>
      <Modal scroll width="45rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <Text weight="bold" css={{ letterSpacing: "1px" }} size={28}>
            {prop.data?.title}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Col css={{ paddingLeft: "0.4rem", paddingRigth: "0.4rem" }}>
            <Row>
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Estado:
                </Text>
                <Spacer x={0.5} />
                <StyledBadge type={prop.data?.status}>
                  {prop.data?.status}
                </StyledBadge>
              </Row>
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
            </Row>
            <Row>
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Fecha:
                </Text>
                <Spacer x={0.5} />
                <Text css={{ letterSpacing: "1px" }}> {prop.data?.date}</Text>
              </Row>
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
            <Spacer y={0.8} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Linea de Investigacion:
              </Text>
              <Spacer x={0.5} />
              <Text css={{ letterSpacing: "1px" }}>
                {" "}
                {prop.data?.researchLine}
              </Text>
            </Row>
            <Spacer y={0.8} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Sublinea de Investigacion:
              </Text>
              <Spacer x={0.5} />
              <Text css={{ letterSpacing: "1px" }}>
                {" "}
                {prop.data?.researchSubline}
              </Text>
            </Row>
            <Spacer y={0.8} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Area Tematica:
              </Text>
              <Spacer x={0.5} />
              <Text css={{ letterSpacing: "1px" }}>
                {" "}
                {prop.data?.areaThematic}
              </Text>
            </Row>
            <Spacer y={0.8} />
            <Row align="center">
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Grupo de investigacion:
              </Text>
              <Spacer x={0.5} />
              <Text css={{ letterSpacing: "1px" }}>
                {" "}
                {prop.data?.investigationGroupName}
              </Text>
            </Row>
            <Spacer y={0.8} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Objetivo General:
            </Text>
            <Spacer y={0.5} />
            <Text css={{ letterSpacing: "1px" }}>
              {" "}
              {prop.data?.generalObjective}
            </Text>
            <Spacer y={0.8} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Objetivos Especificos:
            </Text>
            <Spacer y={0.5} />
            <Text css={{ letterSpacing: "1px" }}>
              {" "}
              {prop.data?.specificObjective}
            </Text>
            <Spacer y={0.8} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Planteamiento del problema:
            </Text>
            <Spacer y={0.5} />
            <Text css={{ letterSpacing: "1px" }}> {prop.data?.approach}</Text>
            <Spacer y={0.8} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Justificacion:
            </Text>
            <Spacer y={0.5} />
            <Text css={{ letterSpacing: "1px" }}>
              {" "}
              {prop.data?.justification}
            </Text>
            <Spacer y={0.8} />
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Bibliografia:
            </Text>
            <Spacer y={0.5} />
            <Text css={{ letterSpacing: "1px" }}>
              {" "}
              {prop.data?.bibliographical}
            </Text>
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
