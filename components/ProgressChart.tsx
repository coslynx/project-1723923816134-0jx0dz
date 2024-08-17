"use client";

import { ProgressChartProps } from "@/types";
import { cn } from "@/utils/helpers";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ProgressChart = ({ title, data, className }: ProgressChartProps) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;