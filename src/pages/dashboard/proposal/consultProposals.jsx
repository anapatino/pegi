import { Table, useModal,Button,Modal,Row, Loading,Container,Col, Tooltip, Text, Spacer } from "@nextui-org/react";
import { StyledBadge } from "../../../assets/icons/StyledBadge";
import { EyeIcon } from "../../../assets/icons//EyeIcon";
import { DeleteIcon } from "../../../assets/icons//DeleteIcon";
import { IconButton } from "../../../assets/icons//IconButton";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../data/http-common";
import { useQuery } from "react-query";



export function ConsultProposal (){
    return(<Outlet />);
}

export function ProposalsTable (){
    const person= JSON.parse(localStorage.getItem('userConfiguration'));
    const { setVisible, bindings } = useModal();
    const [code, setCode] = useState('');
    const [codeProposal, setCodeProposal] = useState('');

    const getParams = (ruta) =>{
        return apiClient.get(ruta).then((res) => res.data);
    }

    const deleteParams = (ruta) =>{
      return apiClient.delete(ruta).then((res) => res.data);
  }

    const {data,isSuccess,isLoading} = useQuery(["search",person], ()=> getParams(`Proposals/get-proposals-document/${person.personDocument}`),{ enabled: !!person,refetchOnWindowFocus:false,retry:false});

    const del = useQuery(["delete",code], ()=> deleteParams(`Proposals/${code}`),{ enabled: !!code,refetchOnWindowFocus:false,retry:false});

    const view = useQuery(["view",codeProposal], ()=> getParams(`Proposals/get-proposal-code/${codeProposal}`),{ enabled: !!codeProposal,refetchOnWindowFocus:false,retry:false});

    if(del.isSuccess){
        window.location.reload();
    }

    const handler = (code) => {
      setCodeProposal(code);
      setVisible(true);
    };

    const columns = [
        { name: "CODIGO", uid: "code" },
        { name: "NOMBRE", uid: "title" },
        { name: "ESTADO", uid: "status" },
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
    
          case "actions":
            return (
              <Row justify="flex-start" align="center">
                <Col>
                  <Tooltip content="Detalles">
                    <IconButton onClick={() => handler(user.code)}>
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
                    onClick={() => setCode(user.code)}
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
            <h3>Mis Propuestas</h3>
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
                width="45rem"
                {...bindings}
            >
        
            <Modal.Header>
              <h2>{view.isSuccess ? view.data.data.title : ""}</h2>
            </Modal.Header>
                {view.isSuccess ?
                (  
            <Modal.Body>
                  <Col css={{paddingLeft:'0.4rem',paddingRigth:'0.4rem'}}>
                  <Row align="center">
                      <Text weight="bold" size={18}>Estado:</Text>
                      <Spacer x={0.5}/>
                      <StyledBadge type={view.data.data.status}>{view.data.data.status}</StyledBadge>
                    </Row>
                    <Row align="center">
                      <Text weight="bold" size={18}>Fecha:</Text>
                      <Spacer x={0.5}/>
                      <Text> {view.data.data.date}</Text>
                    </Row>
                    <Spacer y={0.5}/>
                    <Row align="center">
                      <Text weight="bold" size={18}>Objetivo General:</Text>
                      <Spacer x={0.5}/>
                      <Text> {view.data.data.generalObjective}</Text>
                    </Row>
                    <Spacer y={0.2}/>
                    <Row align="center">
                      <Text weight="bold" size={18}>Objetivos Especificos:</Text>
                      <Spacer x={0.5}/>
                      <Text> {view.data.data.specificObjective}</Text>
                    </Row>
                    <Spacer y={0.2}/>
                    <Text weight="bold" size={18}>Planteamiento del problema:</Text>
                    <Text> {view.data.data.approach}</Text>
                    <Spacer y={0.2}/>
                    <Text weight="bold" size={18}>Justificacion:</Text>
                    <Text> {view.data.data.justification}</Text>
                    <Row align="center">
                      <Text weight="bold" size={18}>Grupo de investigacion:</Text>
                      <Spacer x={0.5}/>
                      <Text> {view.data.data.investigationGroup}</Text>
                    </Row>
                    <Spacer y={0.2}/>
                    <Text weight="bold" size={18}>Bibliografia:</Text>
                    <Text> {view.data.data.bibliographical}</Text>
                 </Col>
              </Modal.Body>
               )
                :view.isLoading ?
                (<Loading type="points" />) : "Hubo un error al cargar los datos"
               }  
              <Modal.Footer>
                <Button auto flat color="error" onClick={() => setVisible(false)}>
                   cerrar
                </Button>
              </Modal.Footer>
            </Modal>
        </Container>
        
    );
}
