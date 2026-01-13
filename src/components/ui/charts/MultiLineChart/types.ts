export type MultiLineTeam = {
  name: string;
  leftKey: string;
  rightKey: string;
};

export type MultiLineDataset = {
  xKey: string;
  leftLabel: string;
  rightLabel: string;
  data: Array<Record<string, number | string>>;
  teams: MultiLineTeam[];
};
