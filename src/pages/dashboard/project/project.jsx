import { Container,Row,Popover,Button,Text,Grid,Spacer} from "@nextui-org/react";
import { ReactComponent as Document} from "../../../assets/icons/Document.svg";
import React ,{  useState }  from "react";
import {Butto} from "../../../styled-components/Input";

export function Project () {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
             <Row justify="space-between"gap={1}>
             <h3>Registrar Proyecto</h3>
            <Popover placement="bottom-right" isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
            <Button type="" flat color="secondary" rounded auto autoFocus="false" >
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
                <Button size="sm" shadow color="error" onClick={{}}>
                  Eliminar
                </Button>
            </Grid.Container>
            </Popover.Content>
            </Popover>
             </Row>
             <FileUploader/>
             <Row justify="space-between" css={{width:'10rem',margin:'1rem 6rem'}}>
                <Button rounded size="sm" light onClick={{}}>
                  Cancelar
                </Button>
                <Spacer x={1}/>
                <Button rounded size="sm" shadow color="secondary" onClick={{}}>
                  Guardar
                </Button>
             </Row>
        </Container>
    );
}

export const FileUploader = () => {

  const [filename, setFilename]=useState();

  const hiddenFileInput = React.useRef(null);
  const handleClick = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChange = async (event) => {
    if(filename!=null && filename!=="" && event.target.files[0]!==undefined){
      console.log(event.target.file[0]);
      //await deleteFile();
    }
    if(event.target.files[0]!==undefined){
      //await Upload(event.target.files[0]);
     console.log(event.target.files);

  }
  };

  return <>
       <Butto  onClick={handleClick}>
         <Document/>
      </Butto>
      
      <input type="file"
             ref={hiddenFileInput}
             style={{display:'none'}} 
             onChange={handleChange}
             accept="application/pdf,image/*"
      />
      </>
};
