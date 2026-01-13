"use client";

import { Col, Row, Typography } from "antd";
import ChartCard from "@/components/ui/charts/ChartCard";
import MultiLineChart from "@/components/ui/charts/MultiLineChart/MultiLineChart";
import PieBarChart from "@/components/ui/charts/PieBarChart/PieBarChart";
import StackedChart from "@/components/ui/charts/StackedChart/StackedChart";
import {
  useCoffeeBrandCharts,
  useCoffeeConsumptionChart,
  useSnackBrandCharts,
  useSnackImpactChart,
  useWeeklyMoodCharts,
  useWeeklyWorkoutCharts,
} from "@/features/charts/queries";

const Loading = () => {
  return <Typography.Text>로딩 중...</Typography.Text>;
};

const RowLayout = ({ children }: { children: React.ReactNode }) => {
  return <Row gutter={[16, 16]}>{children}</Row>;
};

const ColLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Col xs={24} lg={12}>
      {children}
    </Col>
  );
};

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
        <Typography.Title level={3}>차트</Typography.Title>
        <Typography.Text type="secondary">
          과제의 요구조건에 맞춘 차트 페이지입니다.
        </Typography.Text>
      </div>

      <RowLayout>
        <ColLayout>
          <ChartCard title="인기 커피 브랜드 - 막대">
            {coffeeBrands.data ? (
              <PieBarChart data={coffeeBrands.data} variant="bar" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
          <ChartCard title="인기 커피 브랜드 - 도넛">
            {coffeeBrands.data ? (
              <PieBarChart data={coffeeBrands.data} variant="donut" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
          <ChartCard title="인기 간식 브랜드 - 막대">
            {snackBrands.data ? (
              <PieBarChart data={snackBrands.data} variant="bar" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
          <ChartCard title="인기 간식 브랜드 - 도넛">
            {snackBrands.data ? (
              <PieBarChart data={snackBrands.data} variant="donut" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
      </RowLayout>

      <RowLayout>
        <ColLayout>
          <ChartCard title="주간 무드 - 스택형 막대" description="백분율 기준">
            {weeklyMood.data ? (
              <StackedChart
                data={weeklyMood.data}
                keys={["happy", "tired", "stressed"]}
                variant="bar"
                labels={{ happy: "행복", tired: "피로", stressed: "스트레스" }}
              />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
          <ChartCard title="주간 무드 - 스택형 면적" description="백분율 기준">
            {weeklyMood.data ? (
              <StackedChart
                data={weeklyMood.data}
                keys={["happy", "tired", "stressed"]}
                variant="area"
                labels={{ happy: "행복", tired: "피로", stressed: "스트레스" }}
              />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
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
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
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
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
      </RowLayout>

      <RowLayout>
        <ColLayout>
          <ChartCard title="커피 소비 영향도">
            {coffeeConsumption.data ? (
              <MultiLineChart dataset={coffeeConsumption.data} xLabel="컵" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
        <ColLayout>
          <ChartCard title="간식 영향도">
            {snackImpact.data ? (
              <MultiLineChart dataset={snackImpact.data} xLabel="간식" />
            ) : (
              <Loading />
            )}
          </ChartCard>
        </ColLayout>
      </RowLayout>
    </div>
  );
}
