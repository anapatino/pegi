import styled from "styled-components";
export const Nav = styled.nav`
  overflow: hidden;
  margin-top: 30px;
  padding: 35px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  @media (max-width: 1920px) {
    margin-top: 6%;
    width: 93%;
    margin-left: 5%;
  }
  @media (max-width: 1366px) {
    margin-top: 30px;
    width: 100%;
    margin-left: 0;
  }
`;
export const ListItems = styled.ul`
  letter-spacing: 0.7px;
  margin-left: auto;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 2em;

  .about,
  .contact,
  .app,
  li {
    @media (max-width: 1920px) {
      font-size: 1.7rem;
    }
    @media (max-width: 1366px) {
      font-size: 1rem;
    }
  }
`;

export const Title = styled.h3`
  margin-left: 40px;
  letter-spacing: 3px;
  @media (max-width: 1920px) {
    font-size: 2.5rem;
    margin-left: 0;
  }
  @media (max-width: 1366px) {
    font-size: 1.5rem;
  }
`;
