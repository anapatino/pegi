import { Container,Button,Row, Text,Col, Spacer,Input,Radio,Modal} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { useMutation,useQuery } from "react-query";
import { useEffect, useState } from "react";


export function RegisterCv() {
    const { register, handleSubmit,reset ,setValue, watch} = useForm();
    const [visible, setVisible] = useState(false);
    const user  = JSON.parse(localStorage.getItem('userConfiguration'));
    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);;

    const onSubmit = (data) => {
      query.mutate(data);
      const people ={
        nameUser: user.name,
        document: data.document,
      };
      change.mutate(people);
      user.personDocument=data.document;
      localStorage.setItem('userConfiguration',JSON.stringify(user));
      handler();
    };

    const getPerson = () =>{
        return apiClient.get(`people/${user.personDocument}`).then((res) => res.data);
    }

    const {data, isLoading} = useQuery("search", getPerson,{refetchOnWindowFocus:false,retry:false});

    const change = useMutation(people =>{
        return apiClient.post("auth/addPerson/",people ).then((res) => res.data);
    });

    const query = useMutation(people =>{
        return apiClient.post("people",people ).then((res) => res.data);
    });

    useEffect(()=>{
        if(!isLoading && data != null ){
            reset(data.data);
        }
    },[isLoading,reset])

    useEffect(()=>{
        if(change.isLoading && query.isLoading){
            window.location.reload();
        }
    },[change.isLoading,query.isLoading])
   
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
                        <Radio.Group
                        value={watch('identificationType')}
                        onChange={e=>setValue('identificationType',e)}
                        label="Seleccionar tipo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Radio value="TI" size="sm">Tarjeta de indentidad</Radio>
                        <Radio value="CC" size="sm">Cedula</Radio>
                        </Radio.Group>
                        <Spacer x={0.5}/>
                        <Input {...register("document",{ required: true })} label="Documento" clearable css={{marginLeft:'10px',width:'14rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("firstName",{ required: true })} label="Primer Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondName",{ required: true })} label="Segundo Nombre" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("firstLastName",{ required: true })} label="Primer Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Input {...register("secondLastName",{ required: true })} label="Segundo Apellido" width="15rem" clearable css={{margin:'1rem'}}/>
                        <Spacer y={1}/>
                        <Radio.Group
                        value={watch('civilState')}
                        onChange={e=>setValue('civilState',e)}
                        label="Estado Civil:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Radio value="single" size="sm">Soltero/a</Radio>
                        <Radio value="married" size="sm">Casado/a</Radio>
                        <Radio value="widowed" size="sm">Viudo/a</Radio>
                        <Radio value="union" size="sm">Union Libre</Radio>
                        </Radio.Group>
                        <Spacer y={1}/>
                        <Row  align="center">
                        <Radio.Group
                        value={watch('gender')}
                        onChange={e=>setValue('gender',e)}
                        label="Sexo:"
                        orientation="horizontal"
                        color="secondary"
                        >
                        <Radio value="female" size="sm">Femenino</Radio>
                        <Radio value="male" size="sm">Masculino</Radio>
                        </Radio.Group>
                        <Spacer x={0.7}/>
                        <Input {...register("birthDate",{ required: true })} clearable label="Fecha Nacimiento" type="date"   width="15rem" css={{marginLeft:'4rem'}}/>
                        </Row>
                        <Spacer y={1.2}/>
                        <Input {...register("phone",{ required: true })} clearable label="Telefono" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("institutionalMail",{ required: true })} clearable label="Correo" type="email" width="15rem" css={{margin:'1rem'}}/>
                        <Input {...register("citiesCode",{ required: true })} clearable label="Ciudad"  width="15rem" css={{margin:'1rem'}}/>
                        <Spacer y={1}/>
                         { data == null ?
                        (<Row justify="flex-end">
                            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded>Guardar</Button>
                            <Spacer x={5}/>
                        </Row>) : ""}
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