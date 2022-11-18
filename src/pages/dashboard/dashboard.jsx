import { Container,Spacer ,Button,User, Row, Dropdown} from "@nextui-org/react";
import { ContainerDash } from "../../styled-components/Containers";
import { ReactComponent as Vector} from "../../assets/icons/Vector.svg";
import { Outlet,Link } from "react-router-dom";
import { useState } from "react";


export function Dashboard (){
  const [isOpen, setIsOpen] = useState(false);
  /*const [title, setTitle] = useState("");*/
  
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
        <Link  to="" style={{ color: '#FFF' }} className ="bi bi-bar-chart"/>
        </Button>
        <Spacer y={1} />
        <Button light  rounded auto >
        <Link  to="register-cv" style={{ color: '#FFF' }} className ="bi bi-person-fill"/>
        </Button>
        </Container>
        <Container css={{minHeight:'100vh'}} >
             <Container css={{height:'10%', marginTop:'1.2rem',marginBottom:'1.2rem'}}>
              <Row  align="center">
               <h2>Dashboard</h2>
               <Spacer x={35} />
               <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
               <Dropdown.Trigger>
               <User
                 bordered
                 color="secondary"
                 src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                 name="Ana Patiño"
                 description="asofiapatino@unicesar.edu.co"
                 css={{ px: 9 }}
                />
               </Dropdown.Trigger>
               <Dropdown.Menu>
                <Dropdown.Item key="settings" withDivider>
                  Configuraciones
                </Dropdown.Item>
                <Dropdown.Item key="system">Sistema</Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Ayuda y Recomendaciones
               </Dropdown.Item>
               <Dropdown.Item key="logout" color="error" withDivider>
                  Salir
                </Dropdown.Item>
               </Dropdown.Menu>
               </Dropdown>
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
