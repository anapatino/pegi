import { ContainerApp, ContainerMedium} from "../../styled-components/Containers";
import Spline from "@splinetool/react-spline";
import { Text, Input,Button } from "@nextui-org/react";
 
 export  const Login = () => {
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
      <Input clearable bordered labelPlaceholder="Usuario"  css={{
        width:'15rem',
        marginTop:'$20'
      }}/>
      <Input.Password   bordered labelPlaceholder="Contraseña"  css={{
        width:'15rem',
        marginTop:'$15'
      }}/>
       <Button shadow color="secondary" auto css={{ width:'10rem', marginTop:'3rem'}}>
            Ingresar
          </Button>
      </ContainerMedium>
    </ContainerApp>
  );

}
