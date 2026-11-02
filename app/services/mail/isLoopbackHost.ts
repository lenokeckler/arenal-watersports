import { MAIL_TRANSPORT } from "@/app/constants";

export const isLoopbackHost = (host: string): boolean =>
  MAIL_TRANSPORT.LOOPBACK_HOSTS.some(
    (loopbackHost) => loopbackHost === host
  );
