import { MAIL_TRANSPORT } from "@/app/constants";

export const joinMailLines = (
  lines: readonly string[]
): string => lines.join(MAIL_TRANSPORT.LINE_BREAK);
