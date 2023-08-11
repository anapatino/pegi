import styled from "styled-components";

export const ContainerApp = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const ContainerPricipal = styled.div`
  position: absolute;
  width: 70%;
  height: 75%;
  paddin: 5%;
  border-radius: 40px;
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: rgba(2, 1, 1, 0.1) 0px 5px 20px -5px;

  @media (max-width: 1270px) {
    width: 68%;
    height: 70%;
  }

  @media (max-width: 800px) {
    width: 70%;
    height: 90%;
  }
`;

export const ContainerMedium = styled.div`
  position: absolute;
  border-radius: 40px;
  backdrop-filter: saturate(180%) blur(10px);
  box-shadow: rgba(2, 1, 1, 0.1) 0px 5px 20px -5px;
  top: 23%;
  width: 25rem;
  height: 25rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    .ingresarLogin {
      font-size: 4rem;
    }
  }
`;

export const ContainerMin = styled.div`
  border-radius: 25px;
  backdrop-filter: saturate(180%) blur(14px);
  background: rgba(255, 255, 255, 0.05);
  width: 18rem;
  height: 11rem;
  padding: 3px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 10px;
`;

export const ContainerMed = styled.div`
  border-radius: 25px;
  backdrop-filter: saturate(180%) blur(14px);
  background: rgba(255, 255, 255, 0.05);
  width: 30rem;
  height: 13rem;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 10px;
`;

export const ContainerContent = styled.div`
  display: flex;
  margin: 8% 5%;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  h1 {
    @media (max-width: 800px) {
      fontsize: 0.5rem;
    }
  }
  .textPrincipal {
    @media (max-width: 1270px) {
      fontsize: 1rem;
      width: 35rem;
    }

    @media (max-width: 1200px) {
      fontsize: 0.8rem;
      width: 35rem;
    }

    @media (max-width: 900px) {
      width: 28rem;
    }
  }
`;

export const ContainerDash = styled.div`
  height: 100vh;
  margin: 0;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: 6% 90%;
`;
