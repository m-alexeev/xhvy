import { Platform } from "react-native";
import Metrics from "./metrics";
import { configureFonts } from "react-native-paper";

const size = {
  font6: Metrics.screenWidth * (6 / 365),
  font8: Metrics.screenWidth * (8 / 365),
  font10: Metrics.screenWidth * (10 / 365),
  font12: Metrics.screenWidth * (12 / 365),
  font14: Metrics.screenWidth * (14 / 365),
  font16: Metrics.screenWidth * (16 / 365),
  font20: Metrics.screenWidth * (20 / 365),
};

const weight = {
  full: "900",
  semi: "600",
  low: "400",
  bold: "bold",
  normal: "normal",
};

const baseFont = {
  fontFamily: "Montserrat_400Regular, System, Helvetica, Arial, sans-serif",
} as const;

const baseVariants = configureFonts({ config: baseFont });

const customVariants = {
  labelSmall: {
    ...baseVariants.labelSmall,
    fontFamily: "Poppins_500Medium",
  },
  labelMedium: {
    ...baseVariants.labelMedium,
    fontFamily: "Poppins_500Medium",
  },
  labelLarge: {
    ...baseVariants.labelLarge,
    fontFamily: "Poppins_500Medium",
  },
  bodySmall: {
    ...baseVariants.bodySmall,
    fontFamily: "Poppins_400Regular",
  },
  bodyMedium: {
    ...baseVariants.bodyMedium,
    fontFamily: "Poppins_400Regular",
  },
  bodyLarge: {
    ...baseVariants.bodyLarge,
    fontFamily: "Poppins_400Regular",
  },
  titleSmall: {
    ...baseVariants.titleSmall,
    fontFamily: "Poppins_500Medium",
  },
  titleMedium: {
    ...baseVariants.titleMedium,
    fontFamily: "Poppins_500Medium",
  },
  titleLarge: {
    ...baseVariants.titleLarge,
    fontFamily: "Poppins_500Medium",
  },
  headlineSmall: {
    ...baseVariants.headlineSmall,
    fontFamily: "Poppins_400Regular",
  },
  headlineMedium: {
    ...baseVariants.headlineMedium,
    fontFamily: "Poppins_400Regular",
  },
  headlineLarge: {
    ...baseVariants.headlineLarge,
    fontFamily: "Poppins_400Regular",
  },
  displaySmall: {
    ...baseVariants.displaySmall,
    fontFamily: "Poppins_400Regular",
  },
  displayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: "Poppins_400Regular",
  },
  displayLarge: {
    ...baseVariants.displayLarge,
    fontFamily: "Poppins_400Regular",
  },
};

const fontConfigCustom = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});

export { customVariants, fontConfigCustom, size, weight };
