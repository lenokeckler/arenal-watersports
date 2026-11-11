import { MAIL_TRANSPORT } from "@/app/constants";
import type { MailTls } from "./models/MailTls.interface";

export const resolveMailTls = (
  port: number,
  isRemote: boolean
): MailTls => {
  const secure = port === MAIL_TRANSPORT.IMPLICIT_TLS_PORT;

  return { secure, requireTLS: isRemote && !secure };
};
