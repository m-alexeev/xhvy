import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";

const chartStyles = {
  marginVertical: 8,
  borderRadius: 12,
};

const chartConfig: ChartConfig = {
  backgroundGradientFrom: "#6200EE",
  backgroundGradientTo: "#3700B3",
  decimalPlaces: 0,
  color: () => "rgba(255,255,255,1)",
  labelColor: () => "rgba(255,255,255,1)",
  style: {
    borderRadius: 12,
  },
};

export { chartConfig, chartStyles };
