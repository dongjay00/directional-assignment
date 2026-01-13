"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MultiLineDataset } from "@/apis/charts/types";
import LegendControls from "@/features/charts/components/LegendControls";

const PALETTE = ["#0f766e", "#7c3aed", "#d97706", "#2563eb"];

type HoveredPoint = {
  team: string;
  xValue: string | number;
  leftValue: number;
  rightValue: number;
};

type MultiLineChartProps = {
  dataset: MultiLineDataset;
  xLabel: string;
};

const DotShape = ({
  cx,
  cy,
  stroke,
  variant,
  onEnter,
  onLeave,
}: {
  cx?: number;
  cy?: number;
  stroke?: string;
  variant: "circle" | "square";
  onEnter: () => void;
  onLeave: () => void;
}) => {
  if (cx === undefined || cy === undefined) return null;
  const size = 8;
  return variant === "circle" ? (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#fff"
      stroke={stroke}
      strokeWidth={2}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  ) : (
    <rect
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      fill="#fff"
      stroke={stroke}
      strokeWidth={2}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />
  );
};

export default function MultiLineChart({
  dataset,
  xLabel,
}: MultiLineChartProps) {
  const initialLegend = useMemo(
    () =>
      dataset.teams.map((team, index) => ({
        id: team.name,
        label: team.name,
        color: PALETTE[index % PALETTE.length],
        hidden: false,
      })),
    [dataset]
  );

  const [legend, setLegend] = useState(initialLegend);
  const [hovered, setHovered] = useState<HoveredPoint | null>(null);

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

  const activeTeams = legend.filter((item) => !item.hidden);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <LegendControls
        items={legend}
        onToggle={handleToggle}
        onColorChange={handleColor}
      />
      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataset.data}
            margin={{ left: 16, right: 24, top: 8, bottom: 8 }}
            onMouseLeave={() => setHovered(null)}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
            <XAxis dataKey={dataset.xKey} tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              label={{
                value: dataset.leftLabel,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              label={{
                value: dataset.rightLabel,
                angle: 90,
                position: "insideRight",
              }}
            />
            <Tooltip
              content={() => {
                if (!hovered) return null;
                return (
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e6e8ec",
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 12,
                    }}
                  >
                    <strong>{hovered.team}</strong>
                    <div>
                      {xLabel}: {hovered.xValue}
                    </div>
                    <div>
                      {dataset.leftLabel}: {hovered.leftValue}
                    </div>
                    <div>
                      {dataset.rightLabel}: {hovered.rightValue}
                    </div>
                  </div>
                );
              }}
            />
            {activeTeams.map((team) => {
              const color = team.color;
              const meta = dataset.teams.find((t) => t.name === team.id);
              if (!meta) return null;
              return (
                <Line
                  key={meta.leftKey}
                  type="monotone"
                  dataKey={meta.leftKey}
                  stroke={color}
                  strokeWidth={2}
                  dot={(props) => (
                    <DotShape
                      {...props}
                      variant="circle"
                      onEnter={() => {
                        const payload = props.payload as Record<string, number>;
                        setHovered({
                          team: team.label,
                          xValue: payload[dataset.xKey] as unknown as string,
                          leftValue: payload[meta.leftKey] ?? 0,
                          rightValue: payload[meta.rightKey] ?? 0,
                        });
                      }}
                      onLeave={() => setHovered(null)}
                    />
                  )}
                  yAxisId="left"
                />
              );
            })}
            {activeTeams.map((team) => {
              const color = team.color;
              const meta = dataset.teams.find((t) => t.name === team.id);
              if (!meta) return null;
              return (
                <Line
                  key={meta.rightKey}
                  type="monotone"
                  dataKey={meta.rightKey}
                  stroke={color}
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={(props) => (
                    <DotShape
                      {...props}
                      variant="square"
                      onEnter={() => {
                        const payload = props.payload as Record<string, number>;
                        setHovered({
                          team: team.label,
                          xValue: payload[dataset.xKey] as unknown as string,
                          leftValue: payload[meta.leftKey] ?? 0,
                          rightValue: payload[meta.rightKey] ?? 0,
                        });
                      }}
                      onLeave={() => setHovered(null)}
                    />
                  )}
                  yAxisId="right"
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
