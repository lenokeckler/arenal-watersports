export interface MovementBarChartRow {
  key: string;
  label: string;
  value: number;
  valueLabel: string;
}

export interface MovementBarChartProps {
  rows: MovementBarChartRow[];
  title: string;
}
