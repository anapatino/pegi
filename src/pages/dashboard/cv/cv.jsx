import {
  Container,
  Button,
  Row,
  Text,
  Col,
  Spacer,
  Input,
  Radio,
  Popover,
  Grid,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import apiClient from "../../../data/http-common";
import { Select } from "../../../styled-components/Select";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getUser } from "../../../data/user";
import { getPerson, deletePerson } from "../../../controllers/person";
import { getAllDepartments, getCities } from "../../../controllers/location";
import Message from "../../../components/message";
import { FormatDateInitial, FormatDateInput } from "../../../data/formatData";

export function RegisterCv() {
  const token = JSON.parse(localStorage.getItem("userConfiguration"));
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const city = watch("departments");
  const [isOpen, setIsOpen] = useState(false);
  let user = getUser();
  const [document, setDocument] = useState(null);

  const handleDeleteClick = () => {
    setDocument(user.personDocument);
    reset({
      identificationType: "",
      document: "",
      firstName: "",
      secondName: "",
      firstLastName: "",
      secondLastName: "",
      civilState: "",
      gender: "",
      birthDate: "",
      phone: "",
      institutionalMail: "",
      departments: "",
      citiesCode: "",
    });
  };

  const del = useQuery(["delete", document], () => deletePerson(document), {
    enabled: !!document,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const requestOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onSubmit = (data) => {
    const utcDate = FormatDateInitial(data.birthDate);
    delete data.birthDate;

    const { departments, ...newData } = data;
    const people = {
      ...newData,
      nameUser: user.nameUser,
      birthDate: utcDate,
    };
    console.log(people);
    query.mutate(people);

    reset({
      identificationType: "",
      document: "",
      firstName: "",
      secondName: "",
      firstLastName: "",
      secondLastName: "",
      civilState: "",
      gender: "",
      birthDate: "",
      phone: "",
      institutionalMail: "",
      departments: "",
      citiesCode: "",
    });
  };

  const { data, isLoading } = useQuery(
    ["search", user],
    () => getPerson(user.personDocument, requestOptions),
    { enabled: !!user, refetchOnWindowFocus: false, retry: false }
  );

  const query = useMutation((people) => {
    return apiClient.post("people", people, requestOptions).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("personDocument", JSON.stringify(people.document));
        user = getUser();
      }
    });
  });
  const departments = useQuery(
    "departaments",
    () => getAllDepartments(requestOptions),
    { refetchOnWindowFocus: false, retry: false }
  );

  const cities = useQuery(
    ["cities", city],
    () => getCities(city, requestOptions),
    { enabled: !!city, refetchOnWindowFocus: false, retry: false }
  );

  useEffect(() => {
    if (!isLoading && data != null) {
      const newBirthDate = FormatDateInput(data.data.birthDate);
      data.data.birthDate = newBirthDate;
      reset(data.data);
    }
  }, [isLoading, reset, data]);

  return (
    <Container
      id="containerPrincipal"
      css={{ paddingTop: "10px", height: "40rem", overflow: "hidden" }}
    >
      <Row justify="space-between" gap={1}>
        <h3>Hoja de vida</h3>
        <Popover
          placement="bottom-right"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <Popover.Trigger>
            <Button light color="secondary" rounded auto autoFocus="false">
              <i
                to=""
                style={{ color: "#FFF" }}
                className="bi bi-dash-square"
              />
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Grid.Container
              css={{
                borderRadius: "14px",
                padding: "0.75rem",
                width: "21rem",
                alignItems: "center",
              }}
            >
              <Row justify="center" align="center">
                <Text b>Confirmar</Text>
              </Row>
              <Text>Desea eliminar la informacion suministrada?</Text>
              <Button size="sm" light onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Spacer x={1} />
              <Button
                size="sm"
                shadow
                color="error"
                onPress={handleDeleteClick}
              >
                Eliminar
              </Button>
            </Grid.Container>
          </Popover.Content>
        </Popover>
      </Row>
      <Container
        id="containerForm"
        css={{ paddingTop: "10px", height: "27.5rem", overflowY: "auto" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="flex-start">
            <Col css={{ width: "50%" }}>
              <h4>Informacion Personal</h4>
              <Text css={{ margin: "0" }}>Provea sus datos personales.</Text>
            </Col>
            <Col css={{ width: "80%" }}>
              <Spacer y={1} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                <Radio.Group
                  id="radiogroup"
                  value={watch("identificationType")}
                  onChange={(e) => setValue("identificationType", e)}
                  label="Seleccionar tipo:"
                  orientation="horizontal"
                  color="secondary"
                >
                  <Radio value="TI" size="sm">
                    TI
                  </Radio>
                  <Radio value="CC" size="sm">
                    Cedula
                  </Radio>
                </Radio.Group>
                <Spacer x={7.5} />
                <Col css={{ height: "4rem" }}>
                  <Input
                    {...register("document", {
                      required: true,
                      pattern: /^[0-9]+$/,
                      minLength: {
                        value: 4,
                        message: "Min 4 numeros",
                      },
                      maxLength: {
                        value: 10,
                        message: "Max 10 numeros",
                      },
                    })}
                    label="Documento"
                    width="15rem"
                    clearable
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.document?.message}
                  </Text>
                  {errors.document && errors.document.type === "pattern" && (
                    <Text css={{ fontSize: "0.85rem" }}>
                      Solo se permiten numeros
                    </Text>
                  )}
                </Col>
              </Row>
              <Spacer y={1.9} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("firstName", {
                      required: true,
                      pattern: /^[A-Za-zñÑ\s]+$/,
                      maxLength: {
                        value: 20,
                        message: "Max 20 caracteres",
                      },
                    })}
                    label="Primer Nombre"
                    width="15rem"
                    clearable
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.firstName?.message}
                  </Text>
                  {errors.firstName && errors.firstName.type === "pattern" && (
                    <Text css={{ fontSize: "0.85rem" }}>
                      Solo se permiten letras y espacios
                    </Text>
                  )}
                </Col>
                <Spacer x={2} />
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("secondName", {
                      pattern: /^[A-Za-zñÑ\s]+$/,
                      maxLength: {
                        value: 20,
                        message: "Max 20 caracteres",
                      },
                    })}
                    label="Segundo Nombre"
                    width="15rem"
                    clearable
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.secondName?.message}
                  </Text>
                  {errors.secondName &&
                    errors.secondName.type === "pattern" && (
                      <Text css={{ fontSize: "0.85rem" }}>
                        Solo se permiten letras y espacios
                      </Text>
                    )}
                </Col>
              </Row>
              <Spacer y={1.9} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("firstLastName", {
                      required: true,
                      pattern: /^[A-Za-zñÑ\s]+$/,
                      maxLength: {
                        value: 20,
                        message: "Max 20 caracteres",
                      },
                    })}
                    label="Primer Apellido"
                    width="15rem"
                    clearable
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.firstLastName?.message}
                  </Text>
                  {errors.firstLastName &&
                    errors.firstLastName.type === "pattern" && (
                      <Text css={{ fontSize: "0.85rem" }}>
                        Solo se permiten letras y espacios
                      </Text>
                    )}
                </Col>
                <Spacer x={2} />
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("secondLastName", {
                      pattern: /^[A-Za-zñÑ\s]+$/,
                      maxLength: {
                        value: 20,
                        message: "Max 20 caracteres",
                      },
                    })}
                    label="Segundo Apellido"
                    width="15rem"
                    clearable
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.secondLastName?.message}
                  </Text>
                  {errors.secondLastName &&
                    errors.secondLastName.type === "pattern" && (
                      <Text css={{ fontSize: "0.85rem" }}>
                        Solo se permiten letras y espacios
                      </Text>
                    )}
                </Col>
              </Row>
              <Spacer y={2} />
              <Radio.Group
                value={watch("civilState")}
                onChange={(e) => setValue("civilState", e)}
                label="Estado Civil:"
                orientation="horizontal"
                color="secondary"
              >
                <Radio value="single" size="sm">
                  Soltero/a
                </Radio>
                <Radio value="married" size="sm">
                  Casado/a
                </Radio>
                <Radio value="widowed" size="sm">
                  Viudo/a
                </Radio>
                <Radio value="union" size="sm">
                  Union Libre
                </Radio>
              </Radio.Group>
              <Spacer y={1} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                <Radio.Group
                  value={watch("gender")}
                  onChange={(e) => setValue("gender", e)}
                  label="Sexo:"
                  orientation="horizontal"
                  color="secondary"
                >
                  <Radio value="female" size="sm">
                    Femenino
                  </Radio>
                  <Radio id="sexo" value="male" size="sm">
                    Masculino
                  </Radio>
                </Radio.Group>
                {data != null ? (
                  <Input
                    {...register("birthDate")}
                    clearable
                    label="Fecha Nacimiento"
                    width="15rem"
                    css={{ marginLeft: "12%" }}
                  />
                ) : (
                  <Input
                    {...register("birthDate", { required: true })}
                    clearable
                    label="Fecha Nacimiento"
                    type="date"
                    width="15rem"
                    css={{ marginLeft: "12%" }}
                  />
                )}
              </Row>
              <Spacer y={1.2} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("phone", {
                      required: true,
                      pattern: /^[0-9]+$/,
                      maxLength: {
                        value: 10,
                        message: "Max 10 caracteres",
                      },
                    })}
                    clearable
                    label="Telefono"
                    width="15rem"
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.phone?.message}
                  </Text>
                  {errors.phone && errors.phone.type === "pattern" && (
                    <Text css={{ fontSize: "0.85rem" }}>
                      Solo se permiten numeros
                    </Text>
                  )}
                </Col>
                <Spacer x={2} />
                <Col css={{ height: "4rem", width: "15rem" }}>
                  <Input
                    {...register("institutionalMail", {
                      required: true,
                    })}
                    clearable
                    label="Correo"
                    type="email"
                    width="15rem"
                  />
                  <Text css={{ fontSize: "0.85rem" }}>
                    {errors.institutionalMail?.message}
                  </Text>
                </Col>
              </Row>
              <Spacer y={1.7} />
              <Row justify="flex-start" align="center" css={{ height: "4rem" }}>
                {data != null ? (
                  <Input
                    {...register("departamentName")}
                    label="Departamento"
                    width="15rem"
                    clearable
                  />
                ) : (
                  <Col css={{ height: "4rem", width: "15rem" }}>
                    <Text>Departamento:</Text>
                    <Select {...register("departments", { required: true })}>
                      {departments.data !== undefined
                        ? departments.data.data.map((p) => (
                            <option key={p.name} value={p.name}>
                              {p.name}
                            </option>
                          ))
                        : ""}
                    </Select>
                  </Col>
                )}
                <Spacer x={2} />
                {data != null ? (
                  <Input
                    {...register("citiesName")}
                    label="Ciudad"
                    width="15rem"
                    clearable
                  />
                ) : (
                  <Col css={{ height: "4rem", width: "15rem" }}>
                    <Text>Ciudad:</Text>
                    <Select {...register("citiesCode", { required: true })}>
                      {cities.data !== undefined
                        ? cities.data.data.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))
                        : ""}
                    </Select>
                  </Col>
                )}
              </Row>
              <Spacer y={2} />
              {data == null ? (
                <Row justify="flex-end">
                  <Button
                    type="submit"
                    color="secondary"
                    autoFocus="false"
                    size="sm"
                    rounded
                  >
                    Guardar
                  </Button>
                  <Spacer x={5} />
                </Row>
              ) : (
                ""
              )}
              <Spacer y={2} />
            </Col>
          </Row>
        </form>
      </Container>
      {query.isSuccess ? (
        <Message
          type={"success"}
          title={"¡Formulario enviado correctamente!"}
        />
      ) : query.isError ? (
        <Message type={"error"} title={"¡Error al guardar el formulario!"} />
      ) : (
        ""
      )}
      {del.isSuccess ? (
        <Message
          type={"success"}
          title={"Formulario eliminado correctamente"}
          message={del.data.message}
        />
      ) : del.isError ? (
        <Message type={"error"} title={"¡Error al eliminar el formulario!"} />
      ) : (
        ""
      )}
    </Container>
  );
}
