import { Nav, Title, ListItems } from "../styled-components/navbar";
import { Link } from "react-router-dom";
export function Navigation() {
  return (
    <Nav>
      <div className="nLogo">
        <Title className="pegi">Pegi</Title>
      </div>
      <ListItems>
        <li>
          <Link to="about/" className="about" style={{ color: "#FFF" }}>
            Acerca de
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="contact/" className="contact" style={{ color: "#FFF" }}>
            Contacto
          </Link>
        </li>
        <li>|</li>
        <li>
          <Link to="/" className="app" style={{ color: "#FFF" }}>
            Descargar app
          </Link>
        </li>
      </ListItems>
    </Nav>
  );
}
