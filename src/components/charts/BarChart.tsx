import { FC } from "react";
import { BarChart } from "react-native-chart-kit";
import { chartStyles } from "./base";
import { BarChartProps } from "react-native-chart-kit/dist/BarChart";

interface XhvyBarChart extends BarChartProps{
   
}

const XhvyBarChart: FC<XhvyBarChart> = ({...props}) => {
  return (
    <BarChart
      {...props}
      style={chartStyles}
    >
    </BarChart>
  );
};

export default XhvyBarChart;
