import { Table, Row, Container,Col, Tooltip,Spacer,Modal, Text } from "@nextui-org/react";
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
    const [visible, setVisible] = useState(false);
    const person= JSON.parse(localStorage.getItem('userConfiguration'));
    let users = [];
    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);

    
    const getParams = (ruta) =>{
        return apiClient.get(ruta).then((res) => res.data);
    }

    const {data, isLoading} = useQuery(["search",person], ()=> getParams(`Proposals/get-proposals-document/${person.personDocument}`),{ enabled: !!person,refetchOnWindowFocus:false,retry:false});

    if(!isLoading && data != null ){
        data.data.map((p) => users.push({'id': p.code,...p}))
        console.log(users);
    }

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
          case "role":
            return (
              <Col>
                <Row>
                  <Text b size={14} css={{ tt: "capitalize" }}>
                    {cellValue}
                  </Text>
                </Row>
                <Row>
                  <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                    {user.team}
                  </Text>
                </Row>
              </Col>
            );
          case "status":
            return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
    
          case "actions":
            return (
              <Row justify="flex-start" align="center">
                <Col>
                  <Tooltip content="Details">
                    <IconButton onClick={() => console.log("View user", user.id)}>
                      <EyeIcon size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    content="Delete user"
                    color="error"
                    onClick={() => console.log("Delete user", user.id)}
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
            <Table.Body items={users}>
                {(item) => (
                <Table.Row>
                    {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                </Table.Row>
                )}
            </Table.Body>
            </Table>
            </Col>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
            <Modal.Header>
                <Spacer y={2}/>
                <Text id="modal-title" size={18}>
                    Registro de usuario exitoso
                </Text>
                </Modal.Header>
                <Spacer y={0.9}/>  
            </Modal>
        </Container>
    );
}
