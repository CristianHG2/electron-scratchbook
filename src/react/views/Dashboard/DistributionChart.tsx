import { Cell, LabelList, Pie, PieChart } from "recharts";
import React, { FC } from "react";
import { useTheme } from "@chakra-ui/react";

type DistributionChartProps = {
  chartData: { name: string; value: number }[];
};

const DistributionChart: FC<DistributionChartProps> = ({ chartData }) => {
  const theme = useTheme();
  const colors = theme.colors as Record<string, Record<string, string>>;
  const getColor = (index: number) => Object.values(colors)[6 + index]["500"];

  return (
    <PieChart width={400} height={400}>
      <Pie data={chartData} dataKey="value" label>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getColor(index)} />
        ))}
        <LabelList dataKey="name" position="inside" />
      </Pie>
    </PieChart>
  );
};

export default DistributionChart;
