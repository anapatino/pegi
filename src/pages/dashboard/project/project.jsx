import { Container,Row,Popover,Button,Text,Grid,Spacer} from "@nextui-org/react";
import { ReactComponent as Document} from "../../../assets/icons/Document.svg";
import {  useState } from "react";

export function Project () {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
             <Row justify="space-between"gap={1}>
             <h3>Registrar Proyecto</h3>
            <Popover placement="bottom-right" isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
            <Button type="" flat color="secondary" rounded auto autoFocus="false" >
                <i  to="" style={{ color: '#FFF' }} className ="bi bi-dash-square"/>
            </Button>
            </Popover.Trigger>
            <Popover.Content>
            <Grid.Container
              css={{ borderRadius: "14px", padding: "0.75rem", width: "21rem",alignItems:'center' }}
            >
              <Row justify="center" align="center">
                <Text b>Confirmar</Text>
              </Row>
                <Text>
                  Desea eliminar la informacion suministrada?
                </Text>
                <Button size="sm" light onClick={()=>setIsOpen(false)}>
                  Cancel
                </Button>
                <Spacer x={1}/>
                <Button size="sm" shadow color="error" onClick={{}}>
                  Eliminar
                </Button>
            </Grid.Container>
            </Popover.Content>
            </Popover>
             </Row>
             <Button bordered color="secondary" auto  css={{width:'20rem',height:'10rem',margin:'2rem 6rem'}}>
                <Document/>
             </Button>
             <Row justify="space-between" css={{width:'10rem',margin:'1rem 6rem'}}>
                <Button rounded size="sm" light onClick={{}}>
                  Cancelar
                </Button>
                <Spacer x={1}/>
                <Button rounded size="sm" shadow color="secondary" onClick={{}}>
                  Guardar
                </Button>
             </Row>
        </Container>
    );
}