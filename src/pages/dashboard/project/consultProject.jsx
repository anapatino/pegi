import { Table, Row, Container,Col, Tooltip, Text } from "@nextui-org/react";
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
    const [code, setCode] = useState('');

    const getParams = (ruta) =>{
        return apiClient.get(ruta).then((res) => res.data);
    }

    const deleteParams = (ruta) =>{
      return apiClient.delete(ruta).then((res) => res.data);
  }

    const {data} = useQuery(["search",person], ()=> getParams(`Proyect/get-proyect-document${person.personDocument}`),{ enabled: !!person,refetchOnWindowFocus:false,retry:false});

    const del = useQuery(["delete",code], ()=> deleteParams(`Proyect/${code}`),{ enabled: !!code,refetchOnWindowFocus:false,retry:false});

    if(del.isSuccess){
        window.location.reload();
    }

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
                  <Tooltip content="Detalles">
                    <IconButton >
                      <EyeIcon size={20} fill="#979797" />
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
            <Table
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
            </Table>
            </Col>
        </Container>
    );
}
