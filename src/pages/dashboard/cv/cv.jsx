import { Container,Button,Row, Text,Col, Spacer,Input,Radio,Modal, Popover,Grid} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { useMutation,useQuery } from "react-query";
import { useEffect, useState } from "react";


export function RegisterCv() {
    const { register, handleSubmit,reset ,setValue, watch} = useForm();
    const [visible, setVisible] = useState(false);
    const [document,setDocument] = useState(""); 
    const [isOpen, setIsOpen] = useState(false);
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('userConfiguration')));
    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);

    const onSubmit = (data) => {
        const people ={
          ...data,nameUser: user.name,
        };
        query.mutate(people);
        user.personDocument=data.document;
        setUser(localStorage.setItem('userConfiguration',JSON.stringify(user)));    
        handler();        
        window.location.reload();                   
    };


    const getPerson = () =>{
        return apiClient.get(`people/${user.personDocument}`).then((res) => res.data);
    }

    const {data, isLoading} = useQuery(["search",user], getPerson,{ enabled: !!user,refetchOnWindowFocus:false,retry:false});

    const query = useMutation(people =>{
        return apiClient.post("people",people ).then((res) => res.data);
    });

    const deletePerson = () =>{
        return apiClient.delete(`people/${document}`).then((res) => res.data);
    }

    const del = useQuery(["delete",document], deletePerson,{ enabled: !!document,refetchOnWindowFocus:false,retry:false});

    if(del.isSuccess){
        window.location.reload();
    }

   
    useEffect(()=>{
        if(!isLoading && data != null ){
            reset(data.data);
        }
    },[isLoading,reset])

   
    return(
        <Container css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}} >
            <Row justify="space-between"gap={1}>
            <h3>Hoja de vida</h3>
            <Popover placement="bottom-right" isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
            <Button light color="secondary" rounded auto autoFocus="false" >
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
                <Button size="sm" shadow color="error" onClick={()=>setDocument(user.personDocument)}>
                  Eliminar
                </Button>
            </Grid.Container>
            </Popover.Content>
            </Popover>
            </Row>
            <Container css={{paddingTop:'10px',height:'27.5rem',overflowY:'auto'}}  >
               <form onSubmit={handleSubmit(onSubmit)}>
                <Row justify="flex-start" >
                    <Col css={{width:'50%'}}>
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
                    <Text b size={18}> Registrada con Exito. </Text>
                </Text>
             </Modal.Header>
             <Spacer y={0.9}/>  
            </Modal>
        </Container>
    );
   
}
