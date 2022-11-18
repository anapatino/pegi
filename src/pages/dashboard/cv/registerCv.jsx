import { Container,Button,Row, Text,Col, Spacer,Input,Checkbox,Modal} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { useMutation } from "react-query";
import { useState } from "react";

/*
    const getPerson = (document, url) => {
    return apiClient.get(url, { params: { document: document } })
          .then((res) => res.data);         
      };
*/

export function RegisterCv() {
    const [civilState, setCivilState] = useState("");
    const [gender, setGender] = useState("");
    const [type, setType] = useState("");
    const { register, handleSubmit} = useForm();
    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);;

    const onSubmit = (data) => {
      data.civilState= civilState;
      data.gender= gender;
      data.identificationType=type;
      query.mutate(data);
      handler();
    };
  
    const query = useMutation(people =>{
        return apiClient.post("people",people ).then((res) => res.data);
    });

     /*
     const query = useQuery(["people", variable],() => getTweets(variable, "people/"),
     {
      enabled: !!variable,
      retry: false,
      refetchOnWindowFocus: false,
     }  );
     */

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
                        <Input {...register("document",{ required: true })} labelPlaceholder="Documento" clearable css={{marginLeft:'10px',width:'14rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("firstName",{ required: true })} labelPlaceholder="Primer Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondName",{ required: true })} labelPlaceholder="Segundo Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("firstLastName",{ required: true })} labelPlaceholder="Primer Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondLastName",{ required: true })} labelPlaceholder="Segundo Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
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
                        <Input {...register("birthDate",{ required: true })} clearable label="Fecha Nacimiento" type="date"   width="15rem" css={{marginLeft:'4rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("phone",{ required: true })} clearable labelPlaceholder="Telefono" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("institutionalMail",{ required: true })} clearable labelPlaceholder="Correo" type="email" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("citiesCode",{ required: true })} clearable labelPlaceholder="Ciudad"  width="15rem" css={{margin:'1rem'}}/>
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
           
            <Modal  
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
             <Modal.Header>
                <Spacer y={2}/>
                <Text id="modal-title" size={18}>
                    Hoja de vida  
                    <Text b size={18}>
                        {query.isSuccess  ? " Registrada con Exito." :
                         query.isError ? " No fue Registrada" :""}
                    </Text>
                </Text>
                <Text>{query.message}</Text>
             </Modal.Header>
             <Spacer y={0.9}/>
            </Modal>
        </Container>
    );
}