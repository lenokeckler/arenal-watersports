export const SPEND_CHART_COPY = {
  BAR_LABEL: (month: string, amount: string): string =>
    `${month}: ${amount}`,
} as const;
