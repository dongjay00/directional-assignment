"use client";

import { Col, Row, Typography } from "antd";
import ChartCard from "@/features/charts/components/ChartCard";
import MultiLineChart from "@/features/charts/components/MultiLineChart";
import PieBarChart from "@/features/charts/components/PieBarChart";
import StackedChart from "@/features/charts/components/StackedChart";
import {
  useCoffeeBrandCharts,
  useCoffeeConsumptionChart,
  useSnackBrandCharts,
  useSnackImpactChart,
  useWeeklyMoodCharts,
  useWeeklyWorkoutCharts,
} from "@/features/charts/queries";

export default function ChartsDashboard() {
  const coffeeBrands = useCoffeeBrandCharts();
  const snackBrands = useSnackBrandCharts();
  const weeklyMood = useWeeklyMoodCharts();
  const weeklyWorkout = useWeeklyWorkoutCharts();
  const coffeeConsumption = useCoffeeConsumptionChart();
  const snackImpact = useSnackImpactChart();

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <Typography.Title level={3}>데이터 시각화</Typography.Title>
        <Typography.Text type="secondary">
          React Query에서 포매팅된 데이터를 기준으로 차트를 구성했습니다.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ChartCard title="인기 커피 브랜드 - 막대">
            {coffeeBrands.data ? (
              <PieBarChart data={coffeeBrands.data} variant="bar" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="인기 커피 브랜드 - 도넛">
            {coffeeBrands.data ? (
              <PieBarChart data={coffeeBrands.data} variant="donut" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="인기 간식 브랜드 - 막대">
            {snackBrands.data ? (
              <PieBarChart data={snackBrands.data} variant="bar" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="인기 간식 브랜드 - 도넛">
            {snackBrands.data ? (
              <PieBarChart data={snackBrands.data} variant="donut" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ChartCard title="주간 무드 - 스택형 막대" description="백분율 기준">
            {weeklyMood.data ? (
              <StackedChart
                data={weeklyMood.data}
                keys={["happy", "tired", "stressed"]}
                variant="bar"
                labels={{ happy: "행복", tired: "피로", stressed: "스트레스" }}
              />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="주간 무드 - 스택형 면적" description="백분율 기준">
            {weeklyMood.data ? (
              <StackedChart
                data={weeklyMood.data}
                keys={["happy", "tired", "stressed"]}
                variant="area"
                labels={{ happy: "행복", tired: "피로", stressed: "스트레스" }}
              />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="주간 운동 - 스택형 막대" description="백분율 기준">
            {weeklyWorkout.data ? (
              <StackedChart
                data={weeklyWorkout.data}
                keys={["running", "cycling", "stretching"]}
                variant="bar"
                labels={{
                  running: "러닝",
                  cycling: "사이클",
                  stretching: "스트레칭",
                }}
              />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="주간 운동 - 스택형 면적" description="백분율 기준">
            {weeklyWorkout.data ? (
              <StackedChart
                data={weeklyWorkout.data}
                keys={["running", "cycling", "stretching"]}
                variant="area"
                labels={{
                  running: "러닝",
                  cycling: "사이클",
                  stretching: "스트레칭",
                }}
              />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <ChartCard title="커피 소비 영향도">
            {coffeeConsumption.data ? (
              <MultiLineChart dataset={coffeeConsumption.data} xLabel="컵" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
        <Col xs={24} lg={12}>
          <ChartCard title="간식 영향도">
            {snackImpact.data ? (
              <MultiLineChart dataset={snackImpact.data} xLabel="간식" />
            ) : (
              <Typography.Text>로딩 중...</Typography.Text>
            )}
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
