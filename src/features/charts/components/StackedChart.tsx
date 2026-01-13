"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { WeeklyStackDatum } from "@/apis/charts/types";
import LegendControls from "@/features/charts/components/LegendControls";

const PALETTE = ["#0ea5e9", "#f97316", "#22c55e", "#a855f7"];

type StackedChartProps = {
  data: WeeklyStackDatum[];
  keys: string[];
  variant: "bar" | "area";
  labels?: Record<string, string>;
};

export default function StackedChart({
  data,
  keys,
  variant,
  labels,
}: StackedChartProps) {
  const formatPercent = (value?: ValueType) => {
    if (value === undefined || value === null) return "";

    if (Array.isArray(value)) {
      return value.map((item) => `${item}%`).join(", ");
    }

    return `${value}%`;
  };

  const initialLegend = useMemo(
    () =>
      keys.map((key, index) => ({
        id: key,
        label: labels?.[key] ?? key,
        color: PALETTE[index % PALETTE.length],
        hidden: false,
      })),
    [keys, labels]
  );

  const [legend, setLegend] = useState(initialLegend);
  const visibleKeys = legend
    .filter((item) => !item.hidden)
    .map((item) => item.id);

  const handleToggle = (id: string) => {
    setLegend((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, hidden: !item.hidden } : item
      )
    );
  };

  const handleColor = (id: string, color: string) => {
    setLegend((prev) =>
      prev.map((item) => (item.id === id ? { ...item, color } : item))
    );
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <LegendControls
        items={legend}
        onToggle={handleToggle}
        onColorChange={handleColor}
      />
      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          {variant === "bar" ? (
            <BarChart data={data} margin={{ left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatPercent(value)}
              />
              <Tooltip formatter={(value) => formatPercent(value)} />
              {visibleKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="stack"
                  fill={legend.find((item) => item.id === key)?.color}
                />
              ))}
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatPercent(value)}
              />
              <Tooltip formatter={(value) => formatPercent(value)} />
              {visibleKeys.map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  stackId="stack"
                  stroke={legend.find((item) => item.id === key)?.color}
                  fill={legend.find((item) => item.id === key)?.color}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
