import {
  Container,
  Row,
  Button,
  Input,
  Spacer,
  Col,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Select, SelectMedium } from "../../../styled-components/Select";
import { useEffect, useState } from "react";
import {
  getAllLines,
  getSubline,
  getThematicAreas,
  getResearchGroup,
} from "../../../controllers/lines";
import Message from "../../../components/message";
import { FormatDate } from "../../../data/formatData";
import {
  getProposalByCode,
  updateProposal,
} from "../../../controllers/proposal";
import { Link } from "react-router-dom";

export function ModifyProposal() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [code, setCode] = useState("");
  const [dataProposal, setDataProposal] = useState("");
  const codeLine = watch("codeLine");
  const codeSubline = watch("codeSubline");
  const params = useParams();
  const paramValue = params.proposal;
  const onSubmit = (data) => {
    const date = FormatDate();
    const {
      codeLine,
      codeSubline,
      academicProgramCode,
      amountCredits,
      ...newData
    } = data;
    const newProposal = {
      ...newData,
      code: code,
      date: date,
    };
    setDataProposal(newProposal);
    reset({
      title: "",
      personDocument1: "",
      personDocument2: "",
      codeLine: "",
      codeSubline: "",
      thematicAreaCode: "",
      investigationGroup: "",
      approach: "",
      justification: "",
      generalObjective: "",
      specificObjective: "",
      bibliographical: "",
    });
  };

  const update = useQuery(
    ["update", dataProposal],
    () => updateProposal(dataProposal, requestOptions),
    { enabled: !!dataProposal, refetchOnWindowFocus: false, retry: false }
  );

  const { data, isLoading } = useQuery(
    ["searchProposal", paramValue],
    () => getProposalByCode(paramValue, requestOptions),
    { enabled: !!paramValue, refetchOnWindowFocus: false, retry: false }
  );

  const line = useQuery("line", () => getAllLines(requestOptions), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const subline = useQuery(
    ["subline", codeLine],
    () => getSubline(codeLine, requestOptions),
    { enabled: !!codeLine, refetchOnWindowFocus: false, retry: false }
  );

  const area = useQuery(
    ["area", codeSubline],
    () => getThematicAreas(codeSubline, requestOptions),
    { enabled: !!codeSubline, refetchOnWindowFocus: false, retry: false }
  );

  const research = useQuery(
    "research",
    () => getResearchGroup(requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  useEffect(() => {
    if (!isLoading && data != null) {
      reset(data.data);
      setCode(data.data.code);
    }
  }, [isLoading, data, reset]);

  return (
    <Container
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Row
        justify="space-between"
        align="center"
        gap={1}
        css={{ width: "97%" }}
      >
        <h3>Modificar propuesta</h3>
        <Button bordered color="primary" auto rounded>
          <Link to="..">Volver</Link>
        </Button>
      </Row>
      <Container
        css={{
          margin: "0",
          paddingTop: "2rem",
          height: "27.5rem",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Informacion General</h4>
            </Col>
            <Col css={{ width: "70%", height: "4rem" }}>
              <Input
                {...register("title", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 100,
                    message: "Max 100 caracteres",
                  },
                })}
                clearable
                label="Titulo"
                width="42rem"
              />
              <Text css={{ fontSize: "0.85rem" }}>{errors.title?.message}</Text>
              {errors.title && errors.title.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras y espacios
                </Text>
              )}
            </Col>
          </Row>
          <Spacer y={2} />
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Integrantes de la propuesta</h4>
            </Col>
            <Col css={{ width: "70%", marginTop: "2rem", height: "4rem" }}>
              <Row justify="flex-start" css={{ width: "30rem" }}>
                <Col css={{ height: "4rem" }}>
                  <Input
                    {...register("personDocument1", {
                      required: true,
                      pattern: /^[0-9]+$/,
                      maxLength: {
                        value: 10,
                        message: "Max 10 numeros",
                      },
                    })}
                    label="Primer Documento"
                    clearable
                    width="14rem"
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.personDocument1?.message}
                  </Text>
                  {errors.personDocument1 &&
                    errors.personDocument1.type === "pattern" && (
                      <Text css={{ fontSize: "0.85rem" }}>
                        Solo se permiten numeros
                      </Text>
                    )}
                </Col>
                <Col css={{ height: "4rem" }}>
                  <Input
                    {...register("personDocument2", {
                      required: true,
                      pattern: /^[0-9]+$/,
                      maxLength: {
                        value: 10,
                        message: "Max 10 numeros",
                      },
                    })}
                    label="Segundo Documento"
                    clearable
                    width="14rem"
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.personDocument2?.message}
                  </Text>
                  {errors.personDocument2 &&
                    errors.personDocument2.type === "pattern" && (
                      <Text css={{ fontSize: "0.85rem" }}>
                        Solo se permiten numeros
                      </Text>
                    )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Spacer y={3} />
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Informacion Especifica</h4>
            </Col>
            <Col css={{ width: "70%" }}>
              <Row justify="flex-start" align="center" css={{ width: "70%" }}>
                <Col>
                  <Text>Linea de Investigacion:</Text>
                  <Select {...register("codeLine", { required: true })}>
                    {line.data !== undefined
                      ? line.data.data.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))
                      : ""}
                  </Select>
                </Col>
                <Col css={{ margin: " 0 1rem" }}>
                  <Text>Sublinea de investigacion:</Text>
                  <Select {...register("codeSubline", { required: true })}>
                    {subline.data !== undefined
                      ? subline.data.data.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))
                      : ""}
                  </Select>
                </Col>
                <Col css={{ marginRight: "1rem" }}>
                  <Text>Area tematica:</Text>
                  <Select {...register("thematicAreaCode", { required: true })}>
                    {area.data !== undefined
                      ? area.data.data.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.name}
                          </option>
                        ))
                      : ""}
                  </Select>
                </Col>
              </Row>
              <Col css={{ marginTop: "$10" }}>
                <Text>Grupo de investigacion:</Text>
                <SelectMedium
                  {...register("investigationGroup", { required: true })}
                >
                  {research.data !== undefined
                    ? research.data.data.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name}
                        </option>
                      ))
                    : ""}
                </SelectMedium>
              </Col>
            </Col>
          </Row>
          <Spacer y={3} />
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Planteamiento y Justificacion</h4>
            </Col>
            <Col css={{ width: "70%" }}>
              <Textarea
                {...register("approach", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 800,
                    message: "Max 800 caracteres",
                  },
                })}
                label="Planteamiento"
                status="default"
                rows={8}
                css={{ width: "42rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.approach?.message}
              </Text>
              {errors.approach && errors.approach.type === "pattern" && (
                <Text css={{ fontSize: "0.85rem" }}>
                  Solo se permiten letras y espacios
                </Text>
              )}
              <Textarea
                {...register("justification", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 800,
                    message: "Max 800 caracteres",
                  },
                })}
                label="Formulacion"
                status="default"
                rows={8}
                css={{ marginTop: "3rem", width: "42rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.justification?.message}
              </Text>
              {errors.justification &&
                errors.justification.type === "pattern" && (
                  <Text css={{ fontSize: "0.85rem" }}>
                    Solo se permiten letras y espacios
                  </Text>
                )}
            </Col>
          </Row>
          <Spacer y={2} />
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Objetivos</h4>
            </Col>
            <Col css={{ width: "70%" }}>
              <Textarea
                {...register("generalObjective", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 100,
                    message: "Max 100 caracteres",
                  },
                })}
                label="Objetivos general"
                status="default"
                rows={4}
                css={{ width: "42rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.generalObjective?.message}
              </Text>
              {errors.generalObjective &&
                errors.generalObjective.type === "pattern" && (
                  <Text css={{ fontSize: "0.85rem" }}>
                    Solo se permiten letras y espacios
                  </Text>
                )}
              <Textarea
                {...register("specificObjective", {
                  required: true,
                  pattern: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s,.-]+$/,
                  maxLength: {
                    value: 500,
                    message: "Max 500 caracteres",
                  },
                })}
                label="Objetivos especificos"
                status="default"
                rows={4}
                css={{ marginTop: "3rem", width: "42rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.specificObjective?.message}
              </Text>
              {errors.specificObjective &&
                errors.specificObjective.type === "pattern" && (
                  <Text css={{ fontSize: "0.85rem" }}>
                    Solo se permiten letras y espacios
                  </Text>
                )}
            </Col>
          </Row>
          <Spacer y={2} />
          <Row justify="flex-start">
            <Col css={{ width: "30%" }}>
              <h4>Bibliografia</h4>
            </Col>
            <Col css={{ width: "70%" }}>
              <Textarea
                {...register("bibliographical", {
                  required: true,
                  maxLength: {
                    value: 500,
                    message: "Max 500 caracteres",
                  },
                })}
                label="Bibliografias"
                status="default"
                rows={8}
                css={{ width: "42rem" }}
              />
              <Text css={{ fontSize: "0.85rem" }}>
                {errors.bibliographical?.message}
              </Text>
              <Spacer y={2} />
              <Row justify="flex-end">
                <Button
                  id="submit"
                  type="submit"
                  color="secondary"
                  autoFocus="false"
                  rounded
                  size="sm"
                  css={{ marginRight: "6%" }}
                >
                  Modificar
                </Button>
              </Row>
              <Spacer y={2} />
            </Col>
          </Row>
        </form>
      </Container>
      {update.isSuccess ? (
        <Message
          type={"success"}
          title={"Se ha modificado el formulario de propuesta correctamente"}
        />
      ) : update.isError ? (
        <Message
          type={"error"}
          title={"Error al modificar el formulario propuesta"}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
