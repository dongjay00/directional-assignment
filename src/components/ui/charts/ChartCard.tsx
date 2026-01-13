"use client";

import { Card, Typography } from "antd";

type ChartCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function ChartCard({
  title,
  description,
  children,
}: ChartCardProps) {
  return (
    <Card>
      <Typography.Title level={5} style={{ marginBottom: 4 }}>
        {title}
      </Typography.Title>
      {description ? (
        <Typography.Text type="secondary">{description}</Typography.Text>
      ) : null}
      <div style={{ marginTop: 16 }}>{children}</div>
    </Card>
  );
}
