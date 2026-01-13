import { requestJson } from "@/lib/http";
import type {
  CoffeeBrandDto,
  CoffeeConsumptionDto,
  SnackBrandDto,
  SnackImpactDto,
  WeeklyMoodDto,
  WeeklyWorkoutDto,
} from "./types";

export const fetchTopCoffeeBrands = () =>
  requestJson<CoffeeBrandDto[]>("/mock/top-coffee-brands");

export const fetchPopularSnackBrands = () =>
  requestJson<SnackBrandDto[]>("/mock/popular-snack-brands");

export const fetchWeeklyMood = () =>
  requestJson<WeeklyMoodDto[]>("/mock/weekly-mood-trend");

export const fetchWeeklyWorkout = () =>
  requestJson<WeeklyWorkoutDto[]>("/mock/weekly-workout-trend");

export const fetchCoffeeConsumption = () =>
  requestJson<CoffeeConsumptionDto>("/mock/coffee-consumption");

export const fetchSnackImpact = () =>
  requestJson<SnackImpactDto>("/mock/snack-impact");
