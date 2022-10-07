import "./App.css";
import Spline from "@splinetool/react-spline";
import { Text, Container, Button } from "@nextui-org/react";
import { Navegation } from "./components/Navegation.jsx";

function App() {
  return (
    <div className="App">
      <Spline
        className="imagePrincipal"
        scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
      />
      <Container
        className="containerPrincipal"
        css={{
          margin: "5rem auto",
          width: "59rem",
          height: "28rem",
          borderradius: "40px",
          backdropfilter: "saturate(180%) blur(10px)",
          boxshadow: "rgba(2, 1, 1, 0.1) 0px 5px 20px -5px",
        }}
      >
        <Navegation></Navegation>
        <Container
          className="containerContent"
          css={{
            display: "flex",
            position: "relative",
            top: "6.2rem",
            left: "8.4rem",
            justifyContent: "right",
            textalign: "right",
            width: "40rem",
          }}
        >
          <Text>Una aplicacion capaz de</Text>
          <h1>GESTIONAR PROYECTOS</h1>
          <Text>
            Asombroso cómo este sistema de desarrollo te permite gestionar tu
            academia online desde la comodidad de tu hogar.
          </Text>
          <Button css={{ background: "$gradient", marginTop: "10px" }}>
            Ingresar
          </Button>
        </Container>
      </Container>
    </div>
  );
}

export default App;
