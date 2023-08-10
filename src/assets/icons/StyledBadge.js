import { styled } from "@nextui-org/react";

// Badge component will be available as part of the core library soon
export const StyledBadge = styled("span", {
  display: "inline-block",
  textTransform: "uppercase",
  padding: "$3 $4",
  margin: "0 2px",
  fontSize: "10px",
  fontWeight: "$bold",
  borderRadius: "14px",
  letterSpacing: "0.6px",
  lineHeight: 1,
  boxShadow: "1px 2px 5px 0px rgb(0 0 0 / 5%)",
  alignItems: "center",
  alignSelf: "center",
  color: "$white",
  variants: {
    type: {
      Pendiente: {
        bg: "$primaryLight",
        color: "$primaryLightContrast",
      },
      Asignado: {
        bg: "$secondaryLight",
        color: "$secondaryLightContrast",
      },
      Aprobado: {
        bg: "$successLight",
        color: "$successLightContrast",
      },
      Rechazado: {
        bg: "$errorLight",
        color: "$errorLightContrast",
      },
      Corregir: {
        bg: "$secondaryLight",
        color: "$secondaryLightContrast",
      },
    },
  },
  defaultVariants: {
    type: "active",
  },
});
