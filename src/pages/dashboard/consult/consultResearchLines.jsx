import { Container,Spacer,Col,Text} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { SelectFull } from "../../../styled-components/Select";
import { useQuery } from "react-query";
import { getAllLines,getSubline,getThematicAreas } from "../../../controllers/lines";


export default function ConsultResearchLines (){
    const token  = JSON.parse(localStorage.getItem('userConfiguration'));
    const requestOptions = {
      headers: { 'Authorization': `Bearer ${token}` }
    };
    const { register, watch} = useForm();
    const codeLine = watch('codeLine');
    const codeSubline = watch('codeSubline');

    const line = useQuery("line",() => getAllLines(requestOptions),{refetchOnWindowFocus:false,retry:false});

    const subline = useQuery(["subline",codeLine],() => getSubline(codeLine,requestOptions),{enabled: !!codeLine,refetchOnWindowFocus:false,retry:false});

    const area = useQuery(["area",codeSubline],() => getThematicAreas(codeSubline,requestOptions),{enabled: !!codeSubline,refetchOnWindowFocus:false,retry:false});

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
            <Col>
                        <Text>Linea de Investigacion:</Text>
                        <SelectFull {...register("codeLine",{ required: true })}>
                        {
                          line.data !== undefined 
                          ? ( line.data.data.map((p)=> ( <option key={p.code} value={p.code}>{p.name}</option>))
                          ) : "" }
                      </SelectFull>
                      <Spacer y={2}/>
                    <Text>Sublinea de investigacion:</Text>
                    <SelectFull {...register("codeSubline",{ required: true })}>
                    {
                      subline.data !== undefined 
                      ? ( subline.data.data.map((p)=> ( <option key={p.code} value={p.code}>{p.name}</option>))
                      ) : "" }
                   </SelectFull>
                   <Spacer y={2}/>
                    <Text>Area tematica:</Text>
                    <SelectFull {...register("thematicAreaCode",{ required: true })}>
                    {
                      area.data !== undefined 
                      ? ( area.data.data.map((p)=> ( <option key={p.code} value={p.code}>{p.name}</option>))
                      ) : "" }
                   </SelectFull>
            </Col>
        </Container>
    );
}