import { ContainerApp, ContainerMedium} from "../../styled-components/Containers";
import {FormMedium} from "../../styled-components/Forms";
import Spline from "@splinetool/react-spline";
import { Text, Input,Button,Loading  } from "@nextui-org/react";
import {useForm} from "react-hook-form";
import apiClient from "../../data/http-common";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";
 
 export  const Login = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  
  const onSubmit =(data) => {
    query.mutate({ name:data.user, password:data.password});
  }

  const query = useMutation(auth =>{
    return apiClient.post("auth/login",auth ).then((res) => res.data);
  });

  const saveUserConfiguration =(data) => {
    localStorage.setItem('userConfiguration', JSON.stringify(data));
    return <Navigate to="/dashboard" replace={true} />
  }

  return(
    <ContainerApp>
      <Spline 
        scene="https://prod.spline.design/Vk8MhpNxBYU3anGL/scene.splinecode"
      />
      <Text css={
        {
          position:'absolute',
          top: '15%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontSize: '7rem',
          fontWeight: 'bold'
        }}>
        INGRESAR
      </Text>
      <ContainerMedium>
      <FormMedium onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("user",{ required: "ingresar usuario" })} clearable bordered labelPlaceholder="Usuario"  css={{
          width:'15rem',
          marginTop:'$10',
          marginButton:'10rem'
          
        }}/>
        <Text css={{fontSize:'0.9rem'}}>{errors.user?.message}</Text>
       <Input.Password {...register("password",{ required: "ingresar contraseña" })}   bordered labelPlaceholder="Contraseña"  css={{
         width:'15rem',
         marginTop:'$16',
         marginButton:'10rem'
        }}/>
         <Text css={{fontSize:'0.9rem'}} >{errors.password?.message}</Text>
       <Button type="submit" value="submit" shadow color="secondary" auto css={{
         width:'10rem',
         margin:'2rem auto'}}>
         Ingresar
        </Button>    
      </FormMedium>
      <div>
      { query.isLoading
        ? <Loading color="secondary" type="points"/>
      : query.isError
      ? "Error: " + query.error.response.data.message
      : query.data
      ?  (saveUserConfiguration(query.data.data))
      : null}
    </div>
      </ContainerMedium>
    </ContainerApp>
  );

}