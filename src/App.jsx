import Spline from "@splinetool/react-spline";
import {Button, Text } from "@nextui-org/react";
import { Navegation } from "./components/Navegation.jsx";
import { ContainerApp ,ContainerPricipal, ContainerContent} from "./styled-components/Containers.js";

function App() {
  return (
    <ContainerApp >
      <Spline 
        scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
      />
      <ContainerPricipal >
        <Navegation></Navegation>
        <ContainerContent>
          <Text css={{fontSize:'1.2rem'}}>Una aplicacion capaz de</Text>
          <h1>GESTIONAR PROYECTOS</h1>
          <Text css={{fontSize:'1.2rem', width:'45rem'}} >
            Asombroso cómo este sistema de desarrollo te permite gestionar tu
            academia online desde la comodidad de tu hogar.
          </Text>
          <Button css={{ background: "$gradient", width:'5rem', marginTop:'1rem'}}>
            Ingresar
          </Button>
        </ContainerContent>
      </ContainerPricipal>
    </ContainerApp>
  );
}

export default App;
