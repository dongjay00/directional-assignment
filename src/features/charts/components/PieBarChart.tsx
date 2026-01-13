"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PieBarDatum } from "@/apis/charts/types";
import LegendControls from "@/features/charts/components/LegendControls";

const PALETTE = [
  "#0f766e",
  "#7c3aed",
  "#d97706",
  "#2563eb",
  "#db2777",
  "#059669",
];

type PieBarChartProps = {
  data: PieBarDatum[];
  variant: "bar" | "donut";
};

export default function PieBarChart({ data, variant }: PieBarChartProps) {
  const initialLegend = useMemo(
    () =>
      data.map((item, index) => ({
        id: item.id,
        label: item.label,
        color: PALETTE[index % PALETTE.length],
        hidden: false,
      })),
    [data]
  );

  const [legend, setLegend] = useState(initialLegend);

  const visibleData = data.filter(
    (item) => !legend.find((entry) => entry.id === item.id)?.hidden
  );

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
            <BarChart data={visibleData} margin={{ left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {visibleData.map((entry) => {
                  const color =
                    legend.find((item) => item.id === entry.id)?.color ??
                    "#111827";
                  return <Cell key={entry.id} fill={color} />;
                })}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip />
              <Pie
                data={visibleData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={2}
              >
                {visibleData.map((entry) => {
                  const color =
                    legend.find((item) => item.id === entry.id)?.color ??
                    "#111827";
                  return <Cell key={entry.id} fill={color} />;
                })}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
