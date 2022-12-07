import { Table,useModal,Modal, Row, Button,Spacer,Container,Loading,Col, Tooltip, Text } from "@nextui-org/react";
import { StyledBadge } from "../../../assets/icons/StyledBadge";
import { EyeIcon } from "../../../assets/icons/EyeIcon";
import { DeleteIcon } from "../../../assets/icons/DeleteIcon";
import { IconButton } from "../../../assets/icons/IconButton";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../data/http-common";
import { useQuery } from "react-query";



export function ConsultProject (){
    return(<Outlet />);
}

export function ProjectsTable (){
    const person= JSON.parse(localStorage.getItem('userConfiguration'));
    const { setVisible, bindings } = useModal();
    const [code, setCode] = useState('');
    const [codeProject, setCodeProject] = useState('');

    const getParams = (ruta) =>{
        return apiClient.get(ruta).then((res) => res.data);
    }

    const deleteParams = (ruta) =>{
      return apiClient.delete(ruta).then((res) => res.data);
  }

    const {data,isSuccess,isLoading} = useQuery(["search",person], ()=> getParams(`Proyect/get-proyect-document${person.personDocument}`),{ enabled: !!person,refetchOnWindowFocus:false,retry:false});

    const del = useQuery(["delete",code], ()=> deleteParams(`Proyect/${code}`),{ enabled: !!code,refetchOnWindowFocus:false,retry:false});

    const view = useQuery(["view",codeProject], ()=> getParams(`/Proyect/get-proyect-code/${codeProject}`),{ enabled: !!codeProject,refetchOnWindowFocus:false,retry:false});

    if(del.isSuccess){
        window.location.reload();
    }

    const handler = (code) => {
      setCodeProject(code);
      setVisible(true);
    };

    const columns = [
        { name: "CODIGO", uid: "code" },
        { name: "CONTENIDO", uid: "content" },
        { name: "ESTADO", uid: "status" },
        { name: "CALIFICACION", uid: "score" },
        { name: "ACTIONS", uid: "actions" },
    ];

      const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
          case "title":
            return (
              <Text >
                {user.title}
              </Text>
            );
          case "status":
            return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
          
          case "score":
            return (
              <Text >{user.score}</Text>
              );
          case "actions":
            return (
              <Row justify="flex-start" align="center">
                <Col>
                  <Tooltip content="Detalles"  onClick={() =>handler(user.code)}>
                    <IconButton >
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    content="Historial"
                  >
                    <IconButton>
                        <i className="bi bi-folder"></i>
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    content="Eliminar"
                    color="error"
                    onClick={() =>setCode(user.code)}
                  >
                    <IconButton>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </IconButton>
                  </Tooltip>
                </Col>
              </Row>
            );
          default:
            return cellValue;
        }
      };

    return(
        <Container  css={{paddingTop:'10px',height:'40rem', overflow:'hidden'}}>
            <h3>Mis Proyectos</h3>
            <Col css={{paddingTop:'10px',width:'80%', overflowY:'auto'}}>
            {isSuccess && data?.data != null ?
            (<Table
                aria-label="Example table with custom cells"
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
                selectionMode="none"
            >
            <Table.Header columns={columns}>
                {(column) => (
                <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === "actions"}
                    align={column.uid === "actions" ? "center" : "start"}
                >
                    {column.name}
                </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={data?.data || []}>
                {(item) => (
                <Table.Row key={item.code}>
                    {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                </Table.Row>
                )}
            </Table.Body>
            </Table>)
             :isLoading ?
             ( <Loading type="points" />) : "Hubo un error al cargar los datos"
           }
            </Col>
            <Modal
                scroll
                width="35rem"
                {...bindings}
            >
            <Modal.Header>
              <h2>Detalles del documento</h2>
            </Modal.Header>
            <Modal.Body>
              {view.isSuccess ?
                (
                  <Col css={{paddingLeft:'0.4rem',paddingRigth:'0.4rem'}}>
                  <Row align="center">
                      <Text weight="bold" size={18}>Estado:</Text>
                      <Spacer x={0.5}/>
                      <StyledBadge type={view.data.data.status}>{view.data.data.status}</StyledBadge>
                    </Row>
                    <Spacer y={1}/>
                    <Row align="center">
                      <Text weight="bold" size={18}>Calificacion:</Text>
                      <Spacer x={0.5}/>
                      <Text> {view.data.data.score}</Text>
                    </Row>
                    <Spacer y={0.5}/>
                    <Text weight="bold" size={18}>Descargar documento</Text>
                    <Button size={"md"} css={{marginTop:'1rem'}}>
                      {view.data.data.content}
                    </Button>
                    <Text> </Text>
                 </Col>
                )
                :view.isLoading ?
                (<Loading type="points" />) : "Hubo un error al cargar los datos"
              }  
              </Modal.Body>
              <Modal.Footer>
                <Button auto flat color="error" onClick={() => setVisible(false)}>
                   cerrar
                </Button>
              </Modal.Footer>
            </Modal>
        </Container>
    );
}
