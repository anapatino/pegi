import { Nav, Title, ListItems } from "../styled-components/navbar";
import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <Nav>
      <div className="nLogo">
        <Title>Pegi</Title>
      </div>
      <ListItems>
        <li>
          <Link to="about/" style={{ color: "#FFF" }}>
            Acerca de
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="contact/" style={{ color: "#FFF" }}>
            Contacto
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/" style={{ color: "#FFF" }}>
            Descargar app
          </Link>
        </li>
      </ListItems>
    </Nav>
  );
}
