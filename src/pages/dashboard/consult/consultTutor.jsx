import { Table, Container, Loading, Col, Text } from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";
import Message from "../../../components/message";
import { getProfessorByPosition } from "../../../controllers/professor";

export function ConsultTutors() {
  return <Outlet />;
}

export function TutorsTable() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { data, isSuccess, isLoading, isError } = useQuery(
    ["searchTutors"],
    () => getProfessorByPosition("tutor", requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  const columns = [
    { name: "DOCUMENTO", uid: "document" },
    { name: "NOMBRES", uid: "firstName" },
    { name: "APELLIDOS", uid: "firstLastName" },
    { name: "CORREO INSTITUCIONAL", uid: "institutionalMail" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "document":
        return <Text>{user.document}</Text>;
      case "firstName":
        return <Text>{user.firstName + "  " + user.secondName}</Text>;
      case "firstLastName":
        return <Text>{user.firstLastName + "  " + user.secondLastName}</Text>;
      case "institutionalMail":
        return <Text>{user.institutionalMail}</Text>;

      default:
        return cellValue;
    }
  };

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <h3>Lista de Tutores</h3>
      <Col css={{ paddingTop: "10px", width: "90%", overflowY: "auto" }}>
        {isSuccess && data?.data != null ? (
          <Table
            aria-label="Example table with custom cells"
            css={{
              width: "95%",
              height: "70%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={"start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={data?.data || []}>
              {(item) => (
                <Table.Row key={item.document}>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
            <Table.Pagination shadow noMargin align="center" rowsPerPage={5} />
          </Table>
        ) : isLoading ? (
          <Loading type="points" />
        ) : isError ? (
          <Message
            type={"error"}
            title={"¡Ha ocurrido un error a la hora de cargar los tutores!"}
          />
        ) : (
          ""
        )}
      </Col>
    </Container>
  );
}
