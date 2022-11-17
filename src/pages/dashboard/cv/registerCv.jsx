import { Container,Button,Row, Text,Col, Spacer,Input,Checkbox } from "@nextui-org/react";

export function RegisterCv() {
    return(
        <Container css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}} >
            <Row justify="space-between"gap={1}>
            <h3>Hoja de vida</h3>
            <Button flat color="secondary" rounded auto >
                <i  to="" style={{ color: '#FFF' }} className ="bi bi-dash-square"/>
            </Button>
            </Row>
            <Container css={{paddingTop:'10px',height:'27.5rem',overflowY:'auto'}}  >
                <Row justify="flex-start" gap={2} >
                    <Col css={{width:'40%'}}>
                     <h4>Informacion Personal</h4>
                     <Text css={{margin:'0'}}>
                        Provea sus datos personales.
                     </Text>
                    </Col>  
                    <Col css={{width:'60%'}}>
                        <Row justify="flex-start" align="center">
                        <Checkbox.Group
                        label="Seleccionar tipo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Checkbox value="ti" size="sm">Tarjeta de indentidad</Checkbox>
                        <Checkbox value="cc" size="sm">Cedula</Checkbox>
                        </Checkbox.Group>
                        <Input labelPlaceholder="Documento" clearable css={{marginLeft:'10px',width:'14rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input labelPlaceholder="Primer Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input labelPlaceholder="Segundo Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input labelPlaceholder="Primer Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input labelPlaceholder="Segundo Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Checkbox.Group
                        label="Estado Civil:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Checkbox value="single" size="sm">Soltero/a</Checkbox>
                        <Checkbox value="married" size="sm">Casado/a</Checkbox>
                        <Checkbox value="widowed" size="sm">Viudo/a</Checkbox>
                        <Checkbox value="union" size="sm">Union Libre</Checkbox>
                        </Checkbox.Group>
                        <Spacer y={1}/>
                        <Row  align="center">
                        <Checkbox.Group
                        label="Sexo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Checkbox value="femenine" size="sm">Femenino</Checkbox>
                        <Checkbox value="masculine" size="sm">Masculino</Checkbox>
                        </Checkbox.Group>
                        <Input label="Fecha Nacimiento" type="date"   width="15rem" css={{marginLeft:'4rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input labelPlaceholder="Telefono" width="15rem" css={{margin:'1rem'}}/>
                        <Input labelPlaceholder="Correo" type="email" width="15rem" css={{margin:'1rem'}}/>
                        <Input labelPlaceholder="Ciudad"  width="15rem" css={{margin:'1rem'}}/>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}