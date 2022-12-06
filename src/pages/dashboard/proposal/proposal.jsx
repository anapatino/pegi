import { Container,Modal,Row,Button,Input,Spacer,Col,Text,Textarea} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { useNavigate  } from "react-router-dom";
import { useQuery ,useMutation} from "react-query";
import { useState,useEffect } from "react";
import {Select} from "../../../styled-components/Select";

export function Proposal () {
    const  user = JSON.parse(localStorage.getItem('userConfiguration'));
    const { register, handleSubmit, watch} = useForm();
    const codeLine = watch('codeLine');
    const codeSubline = watch('codeSubline');
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    
    const Handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);


    const onSubmit = (data) => {
      const {codeLine,codeSubline,academicProgramCode,amountCredits, ...newData} = data;
      const newProposal ={
        ...newData,status: "pendiente",
      };
      proposal.mutate(newProposal);
    };

    const getParams = (ruta) =>{
      return apiClient.get(ruta).then((res) => res.data);
    }

    const getData = (ruta) =>{
      return apiClient.get(ruta).then((res) => res.data);
    }

    const proposal = useMutation(prop =>{
        return apiClient.post("Proposals",prop ).then( (res)=> {if(res.data !=null){Handler();}});
    });

    const query = useQuery(["search",user],()=> getParams(`people/${user.personDocument}`),{ enabled: !!user,refetchOnWindowFocus:false,retry:false});

    const line = useQuery("line",() => getData("research-lines/get-research-lines"),{refetchOnWindowFocus:false,retry:false});

    const subline = useQuery(["subline",codeLine],() => getParams(`research-sub-lines/${codeLine}`),{enabled: !!codeLine,refetchOnWindowFocus:false,retry:false});

    const area = useQuery(["area",codeSubline],() => getParams(`Thematic-areas/${codeSubline}`),{enabled: !!codeSubline,refetchOnWindowFocus:false,retry:false});

  useEffect(()=>{
    if(query.isError ){
      alert('No puedes registrar propueta si no llenas tu hoja de vida');
      navigate("..");
    }
   
  },[query,navigate])

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
            <Row justify="flex-start" align='center' gap={1} css={{width:'70rem'}}>
            <h3>Presentacion de propuesta</h3>
            </Row>
            <Container css={{margin:'0',paddingTop:'2rem',height:'27.5rem',overflowY:'auto'}}  >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Informacion General</h4>
                </Col>
                <Col css={{width:'70%'}}>
                    <Input {...register("date",{ required: true })}  label="Fecha" type="date" width="15rem" />
                    <Input {...register("title",{ required: true })} clearable label="Titulo"  width="28rem" css={{marginLeft:'1rem'}}/>
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Integrantes de la propuesta</h4>
                    <Spacer y={1}/>
                    <Text css={{margin:'0'}}>Primer Intregrante </Text>
                </Col>
                <Row  justify="flex-start" align="center" css={{width:'68%',marginTop:'2rem'}}> 
                    <Input {...register("personDocument",{ required: true })} label="Documento" clearable width="14rem" />
                </Row>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start" >
                <Col css={{width:'30%'}}>
                    <h4>Informacion Especifica</h4>
                </Col>
                <Col css={{width:'70%'}}>
                  <Row  justify="flex-start" align="center" css={{width:'70%'}}>
                    <Col >
                        <Text>Linea de Investigacion:</Text>
                        <Select {...register("codeLine")}>
                        {
                          line.data !== undefined 
                          ? ( line.data.data.map((p)=> ( <option value={p.code}>{p.name}</option>))
                          ) : "" }
                      </Select>
                    </Col>
                    <Col css={{margin:' 0 1rem'}}>
                    <Text>Sublinea de investigacion:</Text>
                    <Select {...register("codeSubline")}>
                    {
                      subline.data !== undefined 
                      ? ( subline.data.data.map((p)=> ( <option value={p.code}>{p.name}</option>))
                      ) : "" }
                   </Select>
                    </Col>
                    <Col css={{marginRight:'1rem'}}>
                    <Text>Area tematica:</Text>
                    <Select {...register("thematicAreaCode")}>
                    {
                      area.data !== undefined 
                      ? ( area.data.data.map((p)=> ( <option value={p.code}>{p.name}</option>))
                      ) : "" }
                   </Select>
                    </Col>
                    </Row>
                    <Input {...register("investigationGroup",{ required: true })} clearable label="Grupo de Investigacion"  width="29rem" css={{marginTop:'20px'}}/>
                </Col>
                </Row>
                <Spacer y={2}/>
                <Row justify="flex-start">
                <Col css={{width:'30%'}}>
                  <h4>Planteamiento y Justificacion</h4>
                </Col>
                <Col css={{width:'70%'}}>
                <Textarea
                    {...register("approach",{ required: true })} 
                    label="Planteamiento"
                    status="default"
                    rows={8}
                    css={{width:'42rem'}}
                />
                <Textarea
                    {...register("justification",{ required: true })} 
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
                    {...register("generalObjective",{ required: true })} 
                    label="Objetivos general"
                    status="default"
                    rows={4}
                    css={{width:'42rem'}}
                />
                <Textarea
                    {...register("specificObjective",{ required: true })} 
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
                    {...register("bibliographical",{ required: true })} 
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
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
             <Modal.Header>
                <Spacer y={2}/>
                <Text id="modal-title" size={18}>
                   Registro de propuesta exitoso
                </Text>
             </Modal.Header>
             <Spacer y={0.9}/>  
            </Modal>
        </Container>
    );
}


