import { Container,Row,Button,Input,Spacer,Col,Text,Radio,Textarea,Badge,Popover,Grid} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function Proposal () {
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit,setValue, watch} = useForm();

    const onSubmit = (data) => {};

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
            <Row justify="flex-start" align='center' gap={1} css={{width:'70rem'}}>
            <h3>Presentacion de propuesta</h3>
            <Spacer x={1}/>
            <Badge enableShadow disableOutline color="primary">
                Sin entregar
            </Badge>
            <Spacer x={1}/>
            <Button light auto  rounded>
                Historial
            </Button>
            <Spacer x={23}/>
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
                <Button size="sm" shadow color="error">
                  Eliminar
                </Button>
            </Grid.Container>
            </Popover.Content>
            </Popover>
            </Row>
            <Container css={{margin:'0',paddingTop:'2rem',height:'27.5rem',overflowY:'auto'}}  >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Informacion General</h4>
                </Col>
                <Col css={{width:'70%'}}>
                    <Input {...register("Date",{ required: true })} clearable label="Fecha" type="date" width="15rem" />
                    <Input {...register("Title",{ required: true })} clearable label="Titulo"  width="28rem" css={{marginLeft:'1rem'}}/>
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Integrantes de la propuesta</h4>
                    <Spacer y={1}/>
                    <Text css={{margin:'0'}}>Primer Intregrante </Text>
                </Col>
                <Col css={{width:'70%'}}>
                    <Spacer y={2}/>
                    <Row>
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
                    <Spacer x={2}/>
                    <Input {...register("FirstMember",{ required: true })} clearable label="Nombre"  width="25rem" />
                    </Row>
                    <Spacer y={1}/>
                    <Input {...register("FirstDocument",{ required: true })} label="Documento" clearable width="14rem"/>
                    <Input {...register("FirstAcademicProgram",{ required: true })} label="Programa Academico" clearable width="14rem" css={{marginLeft:'10px'}}/>
                    <Input {...register("FirstCredit",{ required: true })} clearable label="N° Creditos"  width="15rem" css={{marginLeft:'10px'}}/>
                    <Input {...register("FirstMail",{ required: true })} label="Correo Institucional" clearable width="14rem" css={{marginTop:'20px'}}/>
                    <Input {...register("FirstPhone",{ required: true })} clearable label="Telefono"  width="14rem" css={{marginLeft:'10px',marginTop:'20px'}}/>
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Informacion Especifica</h4>
                </Col>
                <Col css={{width:'70%'}}>
                    <Input {...register("LinesReserch",{ required: true })} clearable label="Linea de Investigacion"  width="21rem"/>
                    <Input {...register("SublineReserch",{ required: true })} clearable label="Sublinea de Investigacion"  width="21rem" css={{marginLeft:'1rem'}}/>
                    <Input {...register("ThematicArea",{ required: true })} clearable label="Area Tematica"  width="21rem" css={{marginTop:'20px'}}/>
                    <Input {...register("InvestigationGroup",{ required: true })} clearable label="Grupo de Investigacion"  width="21rem" css={{marginLeft:'1rem',marginTop:'20px'}}/>
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start">
                <Col css={{width:'30%'}}>
                  <h4>Planteamiento y Justificacion</h4>
                </Col>
                <Col css={{width:'70%'}}>
                <Textarea
                    {...register("Approach",{ required: true })} 
                    label="Planteamiento"
                    status="default"
                    rows={8}
                    css={{width:'42rem'}}
                />
                <Textarea
                    {...register("Justification",{ required: true })} 
                    label="Formulacion"
                    status="default"
                    rows={8}
                    css={{marginTop:'3rem',width:'42rem'}}
                />
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start">
                <Col css={{width:'30%'}}>
                  <h4>Objetivos</h4>
                </Col>
                <Col css={{width:'70%'}}>
                <Textarea
                    {...register("Approach",{ required: true })} 
                    label="Objetivos general"
                    status="default"
                    rows={4}
                    css={{width:'42rem'}}
                />
                <Textarea
                    {...register("Justification",{ required: true })} 
                    label="Objetivos especificos"
                    status="default"
                    rows={4}
                    css={{marginTop:'3rem',width:'42rem'}}
                />
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start">
                <Col css={{width:'30%'}}>
                  <h4>Bibliografia</h4>
                </Col>
                <Col css={{width:'70%'}}>
                <Textarea
                    {...register("Approach",{ required: true })} 
                    label="Bibliografias"
                    status="default"
                    rows={8}
                    css={{width:'42rem'}}
                />
                <Spacer y={2}/>
                <Row justify="flex-end">
                   <Button type="submit" color="secondary" autoFocus="false" rounded size="sm" >Guardar</Button>
                    <Spacer x={2}/>
                 </Row>
                 <Spacer y={2}/>
                </Col>
                </Row>
              </form>
            </Container>
        </Container>
    );
}