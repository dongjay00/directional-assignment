import { useQuery } from "@tanstack/react-query";
import {
  fetchCoffeeConsumption,
  fetchPopularSnackBrands,
  fetchSnackImpact,
  fetchTopCoffeeBrands,
  fetchWeeklyMood,
  fetchWeeklyWorkout,
} from "@/apis/charts/api";
import type { PieBarDatum } from "@/components/ui/charts/PieBarChart/types";
import type { WeeklyStackDatum } from "@/components/ui/charts/StackedChart/types";
import type { MultiLineDataset } from "@/components/ui/charts/MultiLineChart/types";

const toPieBar = (
  items: Array<{ label: string; value: number }>
): PieBarDatum[] =>
  items.map((item) => ({
    id: item.label,
    label: item.label,
    value: item.value,
  }));

const toPercentStack = <
  T extends Record<string, number | string> & { week: string }
>(
  data: T[]
): WeeklyStackDatum[] =>
  data.map((entry) => {
    const keys = Object.keys(entry).filter((key) => key !== "week");
    const total = keys.reduce((sum, key) => sum + Number(entry[key] ?? 0), 0);
    const result: WeeklyStackDatum = { week: entry.week };
    keys.forEach((key) => {
      const value = Number(entry[key] ?? 0);
      result[key] =
        total === 0 ? 0 : Number(((value / total) * 100).toFixed(1));
    });
    return result;
  });

const buildMultiLine = (config: {
  xKey: string;
  leftLabel: string;
  rightLabel: string;
  teams: Array<{ name: string; points: Array<Record<string, number>> }>;
  leftField: string;
  rightField: string;
}) => {
  const { xKey, leftLabel, rightLabel, teams, leftField, rightField } = config;
  const xValues = teams[0]?.points.map((point) => point[xKey]) ?? [];
  const data = xValues.map((xValue, index) => {
    const row: Record<string, number | string> = { [xKey]: xValue };
    teams.forEach((team) => {
      const point = team.points[index];
      row[`${team.name}_left`] = point?.[leftField] ?? 0;
      row[`${team.name}_right`] = point?.[rightField] ?? 0;
    });
    return row;
  });

  return {
    xKey,
    leftLabel,
    rightLabel,
    data,
    teams: teams.map((team) => ({
      name: team.name,
      leftKey: `${team.name}_left`,
      rightKey: `${team.name}_right`,
    })),
  } satisfies MultiLineDataset;
};

export const useCoffeeBrandCharts = () =>
  useQuery({
    queryKey: ["charts", "coffee-brands"],
    queryFn: fetchTopCoffeeBrands,
    select: (data) =>
      toPieBar(
        data.map((item) => ({
          label: item.brand,
          value: item.popularity,
        }))
      ),
  });

export const useSnackBrandCharts = () =>
  useQuery({
    queryKey: ["charts", "snack-brands"],
    queryFn: fetchPopularSnackBrands,
    select: (data) =>
      toPieBar(data.map((item) => ({ label: item.name, value: item.share }))),
  });

export const useWeeklyMoodCharts = () =>
  useQuery({
    queryKey: ["charts", "weekly-mood"],
    queryFn: fetchWeeklyMood,
    select: (data) => toPercentStack(data),
  });

export const useWeeklyWorkoutCharts = () =>
  useQuery({
    queryKey: ["charts", "weekly-workout"],
    queryFn: fetchWeeklyWorkout,
    select: (data) => toPercentStack(data),
  });

export const useCoffeeConsumptionChart = () =>
  useQuery({
    queryKey: ["charts", "coffee-consumption"],
    queryFn: fetchCoffeeConsumption,
    select: (data) =>
      buildMultiLine({
        xKey: "cups",
        leftLabel: "버그 수",
        rightLabel: "생산성",
        leftField: "bugs",
        rightField: "productivity",
        teams: data.teams.map((team) => ({
          name: team.team,
          points: team.series,
        })),
      }),
  });

export const useSnackImpactChart = () =>
  useQuery({
    queryKey: ["charts", "snack-impact"],
    queryFn: fetchSnackImpact,
    select: (data) =>
      buildMultiLine({
        xKey: "snacks",
        leftLabel: "회의 불참",
        rightLabel: "사기 지수",
        leftField: "meetingsMissed",
        rightField: "morale",
        teams: data.departments.map((dept) => ({
          name: dept.name,
          points: dept.metrics,
        })),
      }),
  });
