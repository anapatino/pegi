import { Container,Modal, Text,Input,Button, Spacer, Col,Row } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Link  } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useMutation,useQuery } from "react-query";
import { useState } from "react";
import {Select} from "../../styled-components/Select";

export function RegisterStudent (){
    const { register, handleSubmit} = useForm();
    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);

    const closeHandler = () => setVisible(false);

    const onSubmit = (newdata) => {
        user.mutate(newdata);    
    }

    const user = useMutation(user =>{
        return apiClient.post("students",user ).then((res) => {if(res.data != null){handler()}});
    });

    const getData = (ruta) =>{
        return apiClient.get(ruta).then((res) => res.data);
    }

    const program = useQuery("program",() => getData("AcademicsProgram/GetAllAcademicPrograms"),{refetchOnWindowFocus:false,retry:false});


    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
          <Row justify="space-between" align="center">
           <h3>Registrar Estudiante</h3>
           <Button bordered color="primary" auto rounded>
              <Link  to=".."  >Volver</Link>
            </Button>
         </Row>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Col css={{paddingTop:'10px',width:'40%'}}>
            <Input {...register("document",{ required: true })} label="Documento" width="14rem" clearable css={{margin:'1.2rem'}}/>
            <Col css={{marginLeft:'1rem'}}>
                <Text>Programa Academico:</Text>
                <Select {...register("academicProgramCode")}>
                  {
                    program.data !== undefined
                    ? ( program.data.data.map((p)=> ( <option value={p.code}>{p.name}</option>))
                    ) : "" }
                </Select>
            </Col>
            <Input {...register("amountCredits",{ required: true })} label="Creditos" width="14rem" type="number"  css={{margin:'1.1rem'}}/>      
            <Spacer y={1}/>
            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded css={{marginLeft:'1rem'}}>Guardar</Button> 
         </Col>
         </form>
         <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
             <Modal.Header>
                <Spacer y={2}/>
                <Text id="modal-title" size={18}>
                Registro de estudiante exitoso
                </Text>
             </Modal.Header>
             <Spacer y={0.9}/>  
            </Modal>
        </Container>
    );
}
