"use client";

import { Checkbox, ColorPicker, Space, Typography } from "antd";

export type LegendItem = {
  id: string;
  label: string;
  color: string;
  hidden?: boolean;
};

type LegendControlsProps = {
  items: LegendItem[];
  onToggle: (id: string) => void;
  onColorChange: (id: string, color: string) => void;
};

export default function LegendControls({
  items,
  onToggle,
  onColorChange,
}: LegendControlsProps) {
  return (
    <Space wrap>
      {items.map((item) => (
        <Space
          key={item.id}
          style={{
            border: "1px solid #e6e8ec",
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          <Checkbox checked={!item.hidden} onChange={() => onToggle(item.id)} />
          <Typography.Text>{item.label}</Typography.Text>
          <ColorPicker
            value={item.color}
            onChange={(_, hex) => onColorChange(item.id, hex)}
          />
        </Space>
      ))}
    </Space>
  );
}
