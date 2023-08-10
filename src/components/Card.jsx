import { ContainerMed } from "../styled-components/Containers";
import { Text, Spacer, Progress, Row } from "@nextui-org/react";
export default function Cards(prop) {
  return (
    <ContainerMed>
      <Text b size={19}>
        {prop.title}
      </Text>
      <Spacer y={1} />
      <Text size={15}>Progreso</Text>
      <Progress value={prop.value} color={prop.color} />
      <Row justify="flex-end">
        <Text size={15}>{prop.value}%</Text>
      </Row>
    </ContainerMed>
  );
}
