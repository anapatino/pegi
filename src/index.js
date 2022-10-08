import { themeDark } from "./styled-components/Theme";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/";
import App from "./App";

ReactDOM.render(
  <NextUIProvider theme={themeDark}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </NextUIProvider>,
  document.getElementById("root")
);
