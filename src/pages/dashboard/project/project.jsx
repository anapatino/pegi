import { Container, Row, Button, Spacer, Text, Input } from "@nextui-org/react";
import { SelectFull } from "../../../styled-components/Select";
import React, { useState } from "react";
import apiClient from "../../../data/http-common";
import { useMutation, useQuery } from "react-query";
import { getUser } from "../../../data/user";
import Message from "../../../components/message";
import {
  getProposalByDocument,
  getProposalByCode,
} from "../../../controllers/proposal";
import { useForm } from "react-hook-form";

export function Project() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const user = getUser();
  const proposalCode = watch("proposalCode");
  const [file, setFile] = useState(null);

  const saveProject = () => {
    const formData = new FormData();

    formData.append("content", file);
    formData.append("personDocument1", user.personDocument);
    formData.append(
      "personDocument2",
      searchProposal.data.data.personDocument2
    );
    formData.append("status", "Pendiente");
    formData.append("score", "0");
    formData.append("proposalCode", proposalCode);

    p.mutate(formData);
    reset({ proposalCode: "", content: "" });
  };

  const { data, isSuccess, isLoading } = useQuery(
    ["search", user],
    () => getProposalByDocument(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const searchProposal = useQuery(
    ["searchProposal", proposalCode],
    () => getProposalByCode(proposalCode, requestOptions),
    { enabled: !!proposalCode, refetchOnWindowFocus: false, retry: false }
  );

  const p = useMutation((prop) => {
    return apiClient
      .post("Project", prop, requestOptions)
      .then((res) => res.data);
  });

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Row justify="space-between" gap={1}>
        <h3>Registrar Proyecto</h3>
      </Row>
      <Spacer y={1.1} />
      <Row align="center">
        <Text css={{ fontSize: "1rem", marginRight: "1rem" }}>Propuesta :</Text>
        {isSuccess && Array.isArray(data.data) ? (
          <SelectFull {...register("proposalCode", { required: true })}>
            {data.data.map((option) => {
              if (option.status === "Aprobado") {
                return (
                  <option key={option.code} value={option.code}>
                    {option.title}
                  </option>
                );
              } else {
                return null;
              }
            })}
          </SelectFull>
        ) : isLoading ? (
          "Cargando..."
        ) : (
          "No han cargado las propuestas"
        )}
      </Row>
      <Spacer y={2} />
      <Row align="flex-start" justify="flex-start">
        <Text css={{ fontSize: "1rem", marginRight: "2.4rem" }}>Archivo:</Text>
        <Input
          width="30rem"
          {...register("content", { required: true })}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {errors.content && (
          <Text css={{ fontSize: "0.85rem" }}>
            Debes seleccionar un archivo PDF
          </Text>
        )}
      </Row>
      <Spacer y={2.3} />
      {isSuccess && data.data.length === 0 ? (
        <Button id="submit" rounded size="sm" shadow color="secondary" disabled>
          Guardar
        </Button>
      ) : (
        <Button
          id="submit"
          rounded
          size="sm"
          shadow
          color="secondary"
          onClick={() => saveProject()}
        >
          Guardar
        </Button>
      )}

      {isSuccess && data.data.length === 0 ? (
        <Message
          type={"warning"}
          title={
            "No puedes registrar un proyecto sin previamente tener una propuesta."
          }
        />
      ) : (
        ""
      )}
      {p.isSuccess ? (
        <Message type={"success"} title={"¡Proyecto enviado correctamente!"} />
      ) : p.isError ? (
        <Message type={"error"} title={"¡Error al guardar el proyecto!"} />
      ) : (
        ""
      )}
    </Container>
  );
}
