export type CoffeeBrandDto = { brand: string; popularity: number };

export type SnackBrandDto = { name: string; share: number };

export type WeeklyMoodDto = {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
};

export type WeeklyWorkoutDto = {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
};

export type CoffeeConsumptionDto = {
  teams: Array<{
    team: string;
    series: Array<{ cups: number; bugs: number; productivity: number }>;
  }>;
};

export type SnackImpactDto = {
  departments: Array<{
    name: string;
    metrics: Array<{ snacks: number; meetingsMissed: number; morale: number }>;
  }>;
};
