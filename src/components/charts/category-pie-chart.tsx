
"use client";

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip as RechartsTooltip, Legend as RechartsLegend } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PieChartEntry } from "@/lib/types";

interface CategoryPieChartProps {
  data: PieChartEntry[];
  config: ChartConfig;
  title?: string;
}

export function CategoryPieChart({ data, config, title }: CategoryPieChartProps) {
  const id = React.useId()

  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No data to display for this chart.</p>;
  }
  
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0)
  }, [data])

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square min-h-[250px] w-full max-w-[300px] sm:max-w-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          accessibilityLayer
        >
          <RechartsTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                hideLabel
                nameKey="name"
                formatter={(value, name, props) => {
                  const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : 0;
                  return (
                    <div className="flex flex-col">
                      <span className="font-semibold">{props.payload?.name}</span>
                      <span>${value.toLocaleString()} ({percentage}%)</span>
                    </div>
                  );
                }}
              />
            }
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            innerRadius="50%"
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180
              const radius = 25 + innerRadius + (outerRadius - innerRadius)
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)
              const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(0) : 0;

              if (parseFloat(percentage) < 5) return null; // Don't show label for very small slices

              return (
                <text
                  x={x}
                  y={y}
                  className="fill-muted-foreground text-xs"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {data[index].name} ({percentage}%)
                </text>
              )
            }}
            
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={config[entry.name]?.color as string || `hsl(var(--chart-${(index % 5) + 1}))`} />
            ))}
          </Pie>
          <RechartsLegend content={<ChartLegendContent nameKey="name" className="text-xs sm:text-sm"/>} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
