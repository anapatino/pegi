import { themeDark } from "../styled-components/theme.jsx";
import { Navbar, Text } from "@nextui-org/react";
import "./navegation.css"

export function Navegation() {
  return (
    <nav className="navegation" id="navegation">
    <div className="nLogo">
    <h3 className="title">Pegi</h3>
    </div>
    <ul className="nListItems">
      <li className="nItem">
        <a className="nLinks">
          Principal
        </a>
      </li>
      <li>|</li>
      <li className="nItem">
        <a href="#" className="nLinks">
          Ingresar
        </a>
      </li>
      <li>|</li>
      <li className="nItem">
        <a href="#" className="nLinks">
          Contacto
        </a>
      </li>
    </ul>
  </nav>
  );
}