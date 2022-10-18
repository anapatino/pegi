import { Navbar,Title,ListItems} from "../styled-components/Navbar";
import {Link}  from "react-router-dom";
export function Navigation() {
  return (
    <Navbar>
    <div className="nLogo">
      <Title >Pegi</Title>
    </div>
    <ListItems>
      <li >
        <Link  to="/" style={{ color: '#FFF' }}>
          Principal
        </Link>
      </li>
      <li>|</li>
      <li >
        <Link to="ingresar" style={{ color: '#FFF' }}>
          Ingresar
        </Link>
      </li>
      <li>|</li>
      <li >
        <Link to="contacto" style={{ color: '#FFF' }}>
          Contacto
        </Link>
      </li>
    </ListItems>
  </Navbar>
  );
}