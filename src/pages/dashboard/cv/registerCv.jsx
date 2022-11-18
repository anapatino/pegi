import { Container,Button,Row, Text,Col, Spacer,Input,Checkbox} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { useMutation } from "react-query";
import { useState } from "react";

export function RegisterCv() {
    const [civilState, setCivilState] = useState();
    const [gender, setGender] = useState();
    const [type, setType] = useState();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      data.civilState= civilState;
      data.gender= gender;
      data.type=type;
      query.mutate(data);
      alert(JSON.stringify(data));
    };

    const query = useMutation(auth =>{
        return apiClient.post("login",auth ).then((res) => res.data);
      });

    return(
        <Container css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}} >
            <Row justify="space-between"gap={1}>
            <h3>Hoja de vida</h3>
            <Button flat color="secondary" rounded auto autoFocus="false">
                <i  to="" style={{ color: '#FFF' }} className ="bi bi-dash-square"/>
            </Button>
            </Row>
            <Container css={{paddingTop:'10px',height:'27.5rem',overflowY:'auto'}}  >
               <form onSubmit={handleSubmit(onSubmit)}> 
                <Row justify="flex-start" gap={2} >
                    <Col css={{width:'40%'}}>
                     <h4>Informacion Personal</h4>
                     <Text css={{margin:'0'}}>
                        Provea sus datos personales.
                     </Text>
                    </Col>                    
                    <Col css={{width:'80%'}}>
                        <Spacer y={1}/>
                        <Row justify="flex-start" align="center">
                        <Checkbox.Group
                        value={type}
                        onChange={setType}
                        label="Seleccionar tipo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Checkbox value="TI" size="sm">Tarjeta de indentidad</Checkbox>
                        <Checkbox value="CC" size="sm">Cedula</Checkbox>
                        </Checkbox.Group>
                        <Input {...register("document")} labelPlaceholder="Documento" clearable css={{marginLeft:'10px',width:'14rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("firstName")} labelPlaceholder="Primer Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondName")} labelPlaceholder="Segundo Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("firstLastName")} labelPlaceholder="Primer Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondLastName")} labelPlaceholder="Segundo Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Checkbox.Group
                        value={civilState}
                        onChange={setCivilState}
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
                        value={gender}
                        onChange={setGender}
                        label="Sexo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Checkbox value="femenine" size="sm">Femenino</Checkbox>
                        <Checkbox value="masculine" size="sm">Masculino</Checkbox>
                        </Checkbox.Group>
                        <Input {...register("birthDate")} label="Fecha Nacimiento" type="date"   width="15rem" css={{marginLeft:'4rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("phone")} labelPlaceholder="Telefono" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("email")} labelPlaceholder="Correo" type="email" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("citiesCode")} labelPlaceholder="Ciudad"  width="15rem" css={{margin:'1rem'}}/>
                        <Spacer y={1}/>
                        <Row justify="flex-end">
                            <Button light color="secondary" autoFocus="false" size="sm" rounded >Cancelar</Button>
                            <Spacer x={1.5}/>
                            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded>Guardar</Button>
                            <Spacer x={5}/>
                        </Row>        
                        <Spacer y={2}/>              
                    </Col>
                </Row>
               </form>  
            </Container>
        </Container>
    );
}