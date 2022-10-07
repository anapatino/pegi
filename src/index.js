import { themeDark } from "./styled-components/Theme";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/";
import App from "./App";

ReactDOM.render(
  <NextUIProvider theme={themeDark}>
    <App />
  </NextUIProvider>,
  document.getElementById("root")
);
