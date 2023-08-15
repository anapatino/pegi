import {
  Container,
  Modal,
  Text,
  Spacer,
  Button,
  Col,
  Row,
} from "@nextui-org/react";
import { StyledBadge } from "../assets/icons/StyledBadge";
import { useState } from "react";

export default function HistoryDocument(prop) {
  const [visible, setVisible] = useState(true);
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Modal scroll width="45rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <Text b id="modal-title" css={{ letterSpacing: "1px" }} size={28}>
            Historial de Proyecto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row align="center">
            <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
              Codigo Proyecto:
            </Text>
            <Spacer x={0.5} />
            <Text css={{ letterSpacing: "1px" }}> {prop.codeProject}</Text>
          </Row>
          {prop.data.map((option) => (
            <Col>
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Codigo Historial:
                </Text>
                <Spacer x={0.5} />
                <Text css={{ letterSpacing: "1px" }}> {option.code}</Text>
              </Row>
              <Spacer y={1} />
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Estado:
                </Text>
                <Spacer x={0.5} />
                <StyledBadge type={option.projectFeedBack.status}>
                  {option.projectFeedBack.status}
                </StyledBadge>
              </Row>
              <Spacer y={1} />
              <Row align="center">
                <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                  Califacion:
                </Text>
                <Spacer x={0.5} />
                <Text css={{ letterSpacing: "1px" }}>
                  {" "}
                  {option.projectFeedBack.score}
                </Text>
              </Row>
              <Spacer y={1} />
              <Text weight="bold" css={{ letterSpacing: "1px" }} size={18}>
                Retroalimentacion:
              </Text>
              <Spacer y={0.5} />
              <Text css={{ letterSpacing: "1px" }}>
                {" "}
                {option.projectFeedBack.comment}
              </Text>
              <Spacer y={1.5} />
            </Col>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            id="closeHistory"
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
