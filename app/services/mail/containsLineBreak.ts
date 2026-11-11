import { MAIL_TRANSPORT } from "@/app/constants";

export const containsLineBreak = (value: string): boolean =>
  MAIL_TRANSPORT.LINE_BREAK_PATTERN.test(value);
