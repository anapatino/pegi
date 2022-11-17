import Spline from "@splinetool/react-spline";
import {Button, Text } from "@nextui-org/react";
import { Navigation } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { ContainerApp ,ContainerPricipal, ContainerContent} from "../../styled-components/Containers";
import { useEffect } from "react";

export function Home () {
  useEffect( () =>{
    
  });
    return(
      <ContainerApp >
         <Spline 
            scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
          />
        <ContainerPricipal >
          <Navigation></Navigation>
          <ContainerContent>
            <Text css={{fontSize:'1.2rem'}}>Una aplicacion capaz de</Text>
           <h1>GESTIONAR PROYECTOS</h1>
           <Text css={{fontSize:'1.2rem', width:'45rem'}} >
               Asombroso cómo este sistema de desarrollo te permite gestionar tu
               academia online desde la comodidad de tu hogar.
            </Text>
            <Button css={{ background: "$gradient", width:'5rem', marginTop:'1rem'}} >         
            <Link  to="login" style={{ color: '#FFF' }}>Ingresar</Link>
            </Button>
          </ContainerContent>
        </ContainerPricipal>
      </ContainerApp>
    );
  }
  
  