import { createTheme } from "@rneui/themed"

const LightColors = {
  primary: "#3949AB", 
  secondary: "#00897C", 
  background: "#ECEFF1",
  searchBg: "#CFD8DC",
  success: "#00E676",
  warning: "#FFC400",
  error: "#FF3D00",
  disabled: "#78909C",
};

const DarkColors= {
  primary: "#7986CB", 
  secondary: "#4DB6AC", 
  background: "#37474F",
  searchBg: "#455A64",
  success: "#00E676",
  warning: "#FFD740",
  error: "#FF6E40",
  disabled: "#546E7A",
}


const theme = createTheme({
  lightColors: LightColors,
  darkColors: DarkColors,
  mode: "dark",
});

export {theme};
