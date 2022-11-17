import { Container,Spacer ,Button,User, Row, Text , Grid, Popover} from "@nextui-org/react";
import { ContainerDash } from "../../styled-components/Containers";
import { ReactComponent as Vector} from "../../assets/icons/Vector.svg";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function Dashboard (){
  const [isOpen, setIsOpen] = useState(false);
    return (
      <ContainerDash>
        <Container css={{
          paddingTop:'2rem',
          marginLeft:'20px',
          display:"flex",
          justifyContent:"center",
          alignContent:"flex-start",
          }}>
        <Vector/>
        <Spacer y={2} />
        <Button light  rounded auto >
        <i className ="bi bi-bar-chart" ></i>
        </Button>
        <Spacer y={1} />
        <Button light  rounded auto >
        <i className="bi bi-person-fill"></i>
        </Button>
        </Container>
        <Container >
             <Container css={{height:'10%', marginTop:'1.2rem',marginBottom:'1.2rem'}}>
              <Row  align="center">
               <h2>Dashboard</h2>
               <Spacer x={35} />
               <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
               <Popover.Trigger>
               <User
                 src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                 name="Ana Patiño"
                 description="asofiapatino@unicesar.edu.co"
                 css={{ px: 9 }}
                />
               </Popover.Trigger>
               <Popover.Content>
               <Spacer y={0.4} />
               <Row justify="center" align="center">
                <Text>¿Desea cerrar sesion?</Text>
               </Row>
               <Spacer y={1} />
               <Grid.Container justify="space-between" alignContent="center">
                  <Grid>
                   <Button size="sm" rounded light>
                     Cancelar
                   </Button>
                 </Grid>
                 <Grid>
                   <Button size="sm" shadow rounded color="error">
                      Salir
                  </Button>
                 </Grid>
                </Grid.Container>
                <Spacer y={0.5} />
               </Popover.Content>
               </Popover>
              </Row>
            </Container>
            <Container css={{height:'80%',width:'100%',overflow:'hidden'}}>
              <Outlet />
            </Container>
        </Container>
      </ContainerDash>   
    );
}

export const Dashbo =() => {
  return ( <h3>Bienvenido al dashboard</h3> );
}


export const Register =() => {
  return ( <h3>Bienvenido al Registro</h3> );
}