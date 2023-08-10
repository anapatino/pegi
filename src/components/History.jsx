import {
  Modal,
  Text,
  Row,
  Spacer,
  Button,
  Col,
  Container,
} from "@nextui-org/react";
import { StyledBadge } from "../assets/icons/StyledBadge";
import { useState } from "react";

export default function History(prop) {
  const [visible, setVisible] = useState(true);

  const closeModal = () => {
    setVisible(false);
  };
  return (
    <Container>
      <Modal scroll width="45rem" open={visible} onClose={closeModal}>
        <Modal.Header>
          <Text b id="modal-title" size={26}>
            Historial de Propuesta
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row align="center">
            <Text weight="bold" size={18}>
              Codigo Propuesta:
            </Text>
            <Spacer x={0.5} />
            <Text> {prop.codeProposal}</Text>
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
                <StyledBadge type={option.proposalFeedBack.status}>
                  {option.proposalFeedBack.status}
                </StyledBadge>
              </Row>
              <Spacer y={1} />
              <Text weight="bold" size={18}>
                Retroalimentacion:
              </Text>
              <Spacer y={0.5} />
              <Text> {option.proposalFeedBack.comment}</Text>
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
