import { Container, Text, Modal, Spacer, Col } from "@nextui-org/react";
import { useState } from "react";
import { ReactComponent as Check } from "../assets/icons/Check.svg";
import { ReactComponent as Error } from "../assets/icons/Error.svg";
import { ReactComponent as Warning } from "../assets/icons/Warning.svg";
import { ReactComponent as Auth } from "../assets/icons/Auth.svg";

export default function Message(prop) {
  const [visible, setVisible] = useState(true);
  const closeHandler = () => setVisible(false);
  return (
    <Container>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        name="modal"
      >
        <Modal.Header>
          <Col justify="center" align="center">
            {prop.type === "success" ? (
              <Check fill="#13B57A" />
            ) : prop.type === "warning" ? (
              <Warning fill="#F0920C" />
            ) : prop.type === "auth" ? (
              <Auth fill="#2196F3" />
            ) : (
              <Error fill="#FF0080" />
            )}
            <Spacer y={1} />
            <Text b size={18}>
              {prop.title}
            </Text>
            {!prop.message ? (
              ""
            ) : (
              <>
                <Text id="modal-title" size={17}>
                  Mensaje especifico:
                </Text>
                <Text id="modal-title" size={17}>
                  {prop.message}
                </Text>
              </>
            )}
          </Col>
        </Modal.Header>
        <Spacer y={0.9} />
      </Modal>
    </Container>
  );
}
