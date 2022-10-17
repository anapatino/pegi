import styled from "styled-components";

export const ContainerApp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ContainerPricipal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 59rem;
  height: 28rem;
  border-radius: 40px;
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: rgba(2, 1, 1, 0.1) 0px 5px 20px -5px;
`;

export const ContainerMedium = styled(ContainerPricipal)`
  top: 47%;
  width: 25rem;
  height: 25rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerContent = styled.div`
  margin: 8% 5%;
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
`;
