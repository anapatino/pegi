import { Button, Text } from "@nextui-org/react";
import { Navigation } from "../../components/Navbar";
import { Login } from "../login/login";
import {
  ContainerApp,
  ContainerPricipal,
  ContainerContent,
} from "../../styled-components/Containers";
import { useState } from "react";
import SplineEmbed from "../../components/SplineEmbed";

export function Home() {
  const [home, setHome] = useState(false);

  return (
    <ContainerApp>
      <>
        <SplineEmbed />
        {home !== true ? (
          <ContainerPricipal>
            <Navigation />
            <ContainerContent>
              <Text css={{ fontSize: "1.2rem" }}>Una aplicacion capaz de</Text>
              <h1 className="title">GESTIONAR PROYECTOS</h1>
              <Text
                className="textPrincipal"
                css={{ fontSize: "1.2rem", width: "45rem" }}
              >
                Asombroso cómo este sistema de desarrollo te permite gestionar
                tu academia online desde la comodidad de tu hogar.
              </Text>
              <Button
                id="login"
                css={{
                  background: "$gradient",
                  width: "5rem",
                  marginTop: "1rem",
                }}
                onPress={() => setHome(true)}
              >
                Ingresar
              </Button>
            </ContainerContent>
          </ContainerPricipal>
        ) : (
          ""
        )}
        {home ? (
          <div>
            <Button
              light
              css={{
                position: "absolute",
                top: "6%",
                left: "4%",
                width: "2rem",
                fontSize: "$2xl",
              }}
              onPress={() => setHome(false)}
            >
              Principal
            </Button>
            <Login />
          </div>
        ) : (
          ""
        )}
      </>
    </ContainerApp>
  );
}
