import { Navbar,Title,ListItems,Links } from "../styled-components/Navbar";
import {Link}  from "react-router-dom";
export function Navegation() {
  return (
    <Navbar>
    <div className="nLogo">
      <Title >Pegi</Title>
    </div>
    <ListItems>
      <li >
        <Link to="/">
          Principal
        </Link>
      </li>
      <li>|</li>
      <li >
        <Link to="/ingresar">
          Ingresar
        </Link>
      </li>
      <li>|</li>
      <li >
        <Link to="/contacto">
          Contacto
        </Link>
      </li>
    </ListItems>
  </Navbar>
  );
}