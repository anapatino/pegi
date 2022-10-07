import { themeDark } from "./styled-components/theme.jsx";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <NextUIProvider theme={themeDark}>
    <App />
  </NextUIProvider>,
  document.getElementById("root")
);
