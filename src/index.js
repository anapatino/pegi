import { themeDark } from "./styled-components/Theme";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom/";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <NextUIProvider theme={themeDark}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </NextUIProvider>,
  document.getElementById("root")
);
