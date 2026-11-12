export interface MovementMonthValue {
  month: string;
  value: number;
}

export interface MovementWeekdayValue {
  value: number;
  weekday: number;
}

export interface MovementIncomeSeries {
  currency: string;
  months: MovementMonthValue[];
}

export interface MovementReportData {
  departuresByMonth: MovementMonthValue[];
  departuresByWeekday: MovementWeekdayValue[];
  incomeByCurrency: MovementIncomeSeries[];
}
