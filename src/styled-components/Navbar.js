import styled from "styled-components";

export const Navbar = styled.nav`
  overflow: hidden;
  margin-top: 30px;
  padding: 35px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
`;
export const ListItems = styled.ul`
  margin-left: auto;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 2em;
`;
export const Links = styled.a`
  color: #ffffff;
  transition: 0.2s ease-in;
`;

export const Title = styled.h3`
  margin-left: 40px;
`;
