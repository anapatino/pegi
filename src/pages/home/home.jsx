import Spline from "@splinetool/react-spline";
import {Button, Text,Loading, Container } from "@nextui-org/react";
import { Navigation } from "../../components/Navbar";
import { Login } from "../login/login";
import { ContainerApp ,ContainerPricipal, ContainerContent} from "../../styled-components/Containers";
import { useState,useEffect } from "react";

export function Home () {
 const [home, setHome ] = useState(false);
 const [loading, setLoading] = useState(true);
 const [splineLoaded, setSplineLoaded] = useState(false);

    useEffect(() => {
      // Simulación de una operación de carga larga
      setTimeout(() => {
        setLoading(false); // Marcar la carga de otros elementos como completa después de un tiempo (puedes reemplazar esto con tu lógica de carga real)
      }, 2000);
    }, []);

    const handleSplineLoad = () => {
      setSplineLoaded(true);
    };
    return(
      <ContainerApp >
        {loading ? (
        <Container
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
        >
           <Loading size="xl" color="secondary" textColor="secondary">
            Cargando
          </Loading>
        </Container>
      ) : (
        <>
         <Spline 
            scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
            onLoad={handleSplineLoad}
          />
          { splineLoaded && home !== true ?
          (
            <ContainerPricipal >
              <Navigation/>
              <ContainerContent>
              <Text css={{fontSize:'1.2rem'}}>Una aplicacion capaz de</Text>
                <h1>GESTIONAR PROYECTOS</h1>
              <Text css={{fontSize:'1.2rem', width:'45rem'}} >
                Asombroso cómo este sistema de desarrollo te permite gestionar tu
                academia online desde la comodidad de tu hogar.
              </Text>
              <Button id="login" css={{ background: "$gradient", width:'5rem', marginTop:'1rem'}} 
                onPress={() => setHome(true)}>   
                Ingresar
              </Button>
              </ContainerContent>
            </ContainerPricipal>
          ): ""}
          {home ?
          (
            <div>
            <Button light css={{ 
               position:'absolute',
               top: '6%', 
               left: '4%', 
               width:'2rem', 
              fontSize:'$2xl'
            }} 
                onPress={() => setHome(false)}>   
                Principal
            </Button>
            <Login/>
            </div>
          ):""
          
          }
          </>
     )}
      </ContainerApp>
    );
  }