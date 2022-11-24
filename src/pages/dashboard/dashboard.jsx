import { Container,Spacer ,Button,User, Row, Dropdown} from "@nextui-org/react";
import { ContainerDash } from "../../styled-components/Containers";
import { ReactComponent as Vector} from "../../assets/icons/Vector.svg";
import { Outlet,Link,useNavigate  } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useState } from "react";
import { useQuery } from "react-query";


export function Dashboard (){
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const user  = JSON.parse(localStorage.getItem('userConfiguration'));
  const navigate = useNavigate();
  
  const getPerson = () =>{
    return apiClient.get(`people/${user.personDocument}`).then((res) => res.data);
  }
  
  const query = useQuery("people", getPerson,{refetchOnWindowFocus:false,retry:false});

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
        <Button light  rounded auto onClick={()=> setTitle("Dashboard")}>
        <Link  to="" style={{ color: '#FFF' }} className ="bi bi-bar-chart"/>
        </Button>
        <Spacer y={1} />
        <Button light  rounded auto onClick={()=> setTitle("Perfil")}>
        <Link  to="cv" style={{ color: '#FFF' }} className ="bi bi-person-fill"/>
        </Button>
        {user.role === "estudiante" ? 
         (
          <div>
            <Spacer y={1} />
            <Button light  rounded auto onClick={()=> setTitle("Propuesta")}>
              <Link  to="proposal" style={{ color: '#FFF' }} className ="bi bi-journal"/>
            </Button>
            <Spacer y={1} />
            <Button light  rounded auto onClick={()=> setTitle("Proyecto")}>
              <Link  to="project" style={{ color: '#FFF' }} className ="bi bi-journal-bookmark-fill"/>
            </Button>
          </div>
         ) : ""
         }
        </Container>
        <Container css={{minHeight:'100vh'}} >
             <Container css={{height:'10%', marginTop:'1.2rem',marginBottom:'1.2rem'}}>
              <Row  align="center" justify="flex-start">
                <Container css={{width:'90rem',margin:'0'}}>
                  <h2>{title}</h2>
                </Container> 
               <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
               <Dropdown.Trigger>
               <User
                 bordered
                 color={user.role === "estudiante" ? "success" : user.role === "docente" ? "secondary":"gradient" }
                 src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                 name={query.data != null ? query.data.data.firstName +" "+ query.data.data.firstLastName :""}
                 description={query.data != null ? query.data.data.institutionalMail :""}
                 css={{ px: 9 }}
                />
               </Dropdown.Trigger>
               <Dropdown.Menu onAction={(e)=>{if(e ==="logout"){localStorage.clear();navigate("/login");window.location.reload();}}}>
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
  return(
    <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
        <h3>Bienvenido al dashboard</h3>
    </Container>
);
}
