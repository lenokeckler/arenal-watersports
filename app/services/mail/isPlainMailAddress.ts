import { MAIL_TRANSPORT } from "@/app/constants";

export const isPlainMailAddress = (
  value: string
): boolean =>
  MAIL_TRANSPORT.PLAIN_ADDRESS_PATTERN.test(value);
