import { useRouteError } from "react-router-dom";
import { Text, Container } from "@nextui-org/react";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    setTimeout(function () {
      window.location.reload();
    }, 1800);
  }, []);

  return (
    <Container css={{ margin: "auto" }}>
      <h3>Oops!</h3>
      <Text css={{ fontSize: "2rem" }}>
        Ha ocurrido un error.. <i>{error.statusText || error.message}</i>
      </Text>
      <Text css={{ fontSize: "1.5rem" }}>
        El servidor esta en pausa, se intentara recargar la pagina en unos
        minutos.
      </Text>
    </Container>
  );
}
