"use client";

import { Card, Typography } from "antd";

type ChartCardProps = {
  title: string;
  description?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
};

export default function ChartCard({
  title,
  description,
  extra,
  children,
}: ChartCardProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Typography.Title level={5} style={{ marginBottom: 4 }}>
          {title}
        </Typography.Title>
        {extra ? <div>{extra}</div> : null}
      </div>
      {description ? (
        <Typography.Text type="secondary">{description}</Typography.Text>
      ) : null}
      <div style={{ marginTop: 16 }}>{children}</div>
    </Card>
  );
}
