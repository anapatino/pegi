import { useRouteError } from "react-router-dom";
import { Text, Container } from "@nextui-org/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container css={{margin: 'auto'}}>
      <h1>Oops!</h1>
      <Text css={{fontSize: '2rem'}}>Sorry, an unexpected error has occurred.. <i>{error.statusText || error.message}</i></Text>
      <Text css={{fontSize: '1.5rem'}}>
        Your request could not be fulfilled because the server is not active. 
      </Text>
    </Container>
  );
}