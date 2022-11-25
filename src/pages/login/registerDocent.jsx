import { Container,Input,Radio,Button, Spacer, Col,Row } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Link  } from "react-router-dom";

export function RegisterDocent (){
    const { register, handleSubmit,watch,setValue} = useForm();

    

    const onSubmit = (data) => {}

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
          <Row justify="space-between" align="center">
           <h3>Registrar Docente</h3>
           <Button bordered color="primary" auto rounded>
              <Link  to=".."  >Volver</Link>
            </Button>
         </Row>
         <form onSubmit={handleSubmit(onSubmit)}>
          <Col css={{paddingTop:'10px',width:'50%', overflowY:'auto'}}>
            <Input {...register("document",{ required: true })} label="Documento" width="22rem" clearable css={{margin:'1rem'}}/>
            <Radio.Group
                css={{margin:'1rem'}}
                value={watch('position')}
                onChange={e=>setValue('position',e)}
                label="Seleccionar tipo:"
                orientation="horizontal"
                color="secondary"
            >
                <Radio value="tutor" size="sm">Tutor</Radio>
                <Radio value="evaluador propuesta" size="sm">Evaluador Propuesta</Radio>
                <Radio value="evaluador proyecto" size="sm">Evaluador Proyecto</Radio>
            </Radio.Group>
            <Spacer y={2}/>
            <Button type="submit" color="secondary" autoFocus="false" size="sm" rounded css={{margin:'0.5rem'}}>Guardar</Button> 
         </Col>
         </form>
        </Container>
    );
}
