import { STRING } from "@/app/constants";

const SUMMARY_SEPARATOR = [
  STRING.SPACE,
  STRING.MIDDLE_DOT,
  STRING.SPACE,
].join(STRING.Empty);

export const joinSummaryParts = (parts: string[]): string =>
  parts.join(SUMMARY_SEPARATOR);
