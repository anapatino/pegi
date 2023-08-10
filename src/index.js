import { themeDark } from "./styled-components/Theme";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap-icons/font/bootstrap-icons.css";
import { router } from "./routes/Route";
import React from "react";
import ReactDOM from "react-dom/";

const queryClient = new QueryClient();

ReactDOM.render(
  <NextUIProvider theme={themeDark}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </NextUIProvider>,
  document.getElementById("root")
);
