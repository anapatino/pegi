import { Container, Text,Input,Button, Spacer, Col,Row } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Link  } from "react-router-dom";
import apiClient from "../../data/http-common";
import { useMutation,useQuery } from "react-query";
import {Select} from "../../styled-components/Select";
import { getAllProgram } from "../../controllers/program";
import Message from "../../components/message";

export function RegisterStudent (){
    const { register, handleSubmit,reset,formState: { errors }} = useForm();

    const onSubmit = (newdata) => {
        user.mutate(newdata);
        reset({
            document:"",
            academicProgramCode: "",
            amountCredits: "",
          });
    }

    const user = useMutation(user =>{
        return apiClient.post("students",user).then((res) =>res.data);
    });

    const program = useQuery("program",() => getAllProgram(),{refetchOnWindowFocus:false,retry:false});

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
          <Col css={{height:'7rem'}}>
            <Input {...register("document",{
                required: true ,
                pattern: /^[0-9]+$/ ,
                minLength: {
                    value: 4,
                    message: "Min 4 numeros",
                  },
                maxLength: {
                value: 10,
                message: 'Max 10 numeros' 
            }})} label="Documento" width="14rem" clearable />
             <Text css={{fontSize:'0.85rem'}}>{errors.document?.message}</Text>
            {errors.document && errors.document.type === "pattern" && (
                <Text css={{fontSize:'0.85rem'}}>Solo se permiten numeros</Text>
            )}
           </Col>
           <Spacer y={1}/>
            <Col css={{height:'7rem'}}>
                <Text>Programa Academico:</Text>
                <Select {...register("academicProgramCode")}>
                  {
                    program.data !== undefined
                    ? ( program.data.data.map((p)=> ( <option value={p.code}>{p.name}</option>))
                    ) : "" }
                </Select>
            </Col>
            <Spacer y={1}/>
            <Col css={{height:'7rem'}}>
            <Input {...register("amountCredits",{
                required: true ,
                pattern: /^[0-9]+$/ ,
                maxLength: {
                value: 10,
                message: 'Max 10 numeros' 
            }})} label="Creditos" width="14rem" type="number" />
             <Text css={{fontSize:'0.85rem'}}>{errors.amountCredits?.message}</Text>
            {errors.amountCredits && errors.amountCredits.type === "pattern" && (
                <Text css={{fontSize:'0.85rem'}}>Solo se permiten numeros</Text>
            )}
            </Col>
            <Spacer y={1}/>
            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded >Guardar</Button> 
         </Col>
         </form>
         {user.isSuccess  ? <Message type={"success"} title={"Estudiante creado correctamente"} /> : user.isError ? <Message type={"error"} title={"¡Error al crear Estudiante!"}/>: "" }
        </Container>
    );
}
