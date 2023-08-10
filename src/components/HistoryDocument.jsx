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
  console.log(prop.data);
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Modal scroll width="45rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <Text b id="modal-title" size={28}>
            Historial de Proyecto
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row align="center">
            <Text weight="bold" size={18}>
              Codigo Proyecto:
            </Text>
            <Spacer x={0.5} />
            <Text> {prop.codeProject}</Text>
          </Row>
          {prop.data.map((option) => (
            <Col>
              <Row align="center">
                <Text weight="bold" size={18}>
                  Codigo Historial:
                </Text>
                <Spacer x={0.5} />
                <Text> {option.code}</Text>
              </Row>
              <Spacer y={1} />
              <Row align="center">
                <Text weight="bold" size={18}>
                  Estado:
                </Text>
                <Spacer x={0.5} />
                <StyledBadge type={option.projectFeedBack.status}>
                  {option.projectFeedBack.status}
                </StyledBadge>
              </Row>
              <Spacer y={1} />
              <Row align="center">
                <Text weight="bold" size={18}>
                  Califacion:
                </Text>
                <Spacer x={0.5} />
                <Text> {option.projectFeedBack.score}</Text>
              </Row>
              <Spacer y={1} />
              <Text weight="bold" size={18}>
                Retroalimentacion:
              </Text>
              <Spacer y={0.5} />
              <Text> {option.projectFeedBack.comment}</Text>
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
