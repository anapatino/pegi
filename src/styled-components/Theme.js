import { createTheme } from "@nextui-org/react";

const fonts = {
  sans: "'Quicksand', sans-serif",
};

export const themeDark = createTheme({
  type: "dark",
  theme: {
    fonts,
    colors: {
      // brand colors
      blueLight: "$blue700",
      blueMedium: "$blue800",
      blueDark: "$blue600",
      purpleLight: "$purple800",
      purpleMedium: "$purple700",
      purpleDark: "$purple600",
      greenLight: "$green800",
      greenMedium: "$green700",
      greenDark: "$green600",

      gradient:
        "linear-gradient(112deg, $blue700 10%, $purple700 30%, $green700 80%)",
      backdropFilter: "saturate(180%) blur(10px)",
      boxShadow: "rgba(2, 1, 1, 0.1) 0px 5px 20px -5px",
      link: "#3694FF",

      myColor: "$white",
    },
    space: {},
  },
});

export const themeLight = createTheme({
  type: "light",
  theme: {
    colors: {
      // brand colors
      blueLight: "$blue700",
      blueMedium: "$blue800",
      blueDark: "$blue600",
      purpleLight: "$purple800",
      purpleMedium: "$purple700",
      purpleDark: "$purple600",
      greenLight: "$green800",
      greenMedium: "$green700",
      greenDark: "$green600",

      gradient:
        "linear-gradient(112deg, $blue800 -25%, $purple700 -10%, $green700 80%)",
      backdropFilter: "saturate(180%) blur(10px)",
      boxShadow: "rgba(2, 1, 1, 0.1) 0px 5px 20px -5px",
      link: "$blue600",

      myColor: "$black",
    },
    space: {},
    fonts: {},
  },
});
