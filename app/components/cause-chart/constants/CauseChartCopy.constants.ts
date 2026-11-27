export const CAUSE_CHART_COPY = {
  BAR_LABEL: (cause: string, count: number): string =>
    `${cause}: ${count}`,
} as const;
