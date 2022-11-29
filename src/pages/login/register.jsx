import { Container,Input,Radio,Button, Modal,Spacer, Text, Col, Row } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Outlet,Link } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useMutation } from "react-query";
import { useState } from "react";



export function Register (){
    return(<Outlet />);
}

export function RegisterUser (){
    const { register, handleSubmit,watch,setValue} = useForm();
    const [visible, setVisible] = useState(false);

    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);
    
    const onSubmit = (data) => {
        user.mutate(data);
    }

    const user = useMutation(user =>{
        return apiClient.post("auth/sign-up",user ).then(handler());
    });

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
         <Row justify="space-between" align="center">
           <h3>Registrar Usuario</h3>
           <Button bordered color="primary" auto rounded >
                <Link to="docent/" >Registrar docente</Link>
            </Button>
         </Row>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Col css={{paddingTop:'10px',width:'50%', overflowY:'auto'}}>
            <Input {...register("name",{ required: true })} label="Correo" width="22rem" clearable css={{margin:'1rem'}}/>
             <Input {...register("password",{ required: true })} label="Contraseña" width="22rem" clearable css={{margin:'1rem'}}/>
            <Radio.Group
                css={{margin:'1rem'}}
                value={watch('role')}
                onChange={e=>setValue('role',e)}
                label="Seleccionar tipo:"
                orientation="horizontal"
                color="secondary"
            >
                <Radio value="estudiante" size="sm">Estudiante</Radio>
                <Radio value="docente" size="sm">Docente</Radio>
                <Radio value="administrador" size="sm">Administrador</Radio>
            </Radio.Group>
            <Spacer y={2}/>
            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded css={{margin:'0.5rem'}}>Guardar</Button> 
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
                    Registro de usuario exitoso
                </Text>
             </Modal.Header>
             <Spacer y={0.9}/>  
            </Modal>
        </Container>
    );
}
