import { Navbar,Title,ListItems,Links } from "../styled-components/Navbar";

export function Navegation() {
  return (
    <Navbar>
    <div className="nLogo">
      <Title >Pegi</Title>
    </div>
    <ListItems>
      <li >
        <Links href="#">
          Principal
        </Links>
      </li>
      <li>|</li>
      <li >
        <Links href="#" >
          Ingresar
        </Links>
      </li>
      <li>|</li>
      <li >
        <Links href="#" >
          Contacto
        </Links>
      </li>
    </ListItems>
  </Navbar>
  );
}