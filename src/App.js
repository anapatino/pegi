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
      <Container className="containerPrincipal">
        <Navegation></Navegation>
        <Container className="containerContent">
          <Text css={{}}>Una aplicacion capaz de</Text>
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
