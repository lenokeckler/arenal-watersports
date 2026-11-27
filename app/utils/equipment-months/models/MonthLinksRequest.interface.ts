export interface MonthLinksRequest {
  month: string;
  months: string[];
  toHref: (month: string) => string;
}
