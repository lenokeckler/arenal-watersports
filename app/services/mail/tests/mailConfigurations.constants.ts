import { MAIL_TRANSPORT } from "@/app/constants";
import type { MailConfiguration } from "../models/MailConfiguration.interface";
import {
  FROM_ADDRESS,
  LOCAL_PORT,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SMTP_USER,
  SUBMISSION_PORT,
} from "./mail.constants";

export const REMOTE_CONFIGURATION: MailConfiguration = {
  from: FROM_ADDRESS,
  host: REMOTE_HOST,
  password: SECRET_PASSWORD,
  port: Number(SUBMISSION_PORT),
  requireTLS: true,
  secure: false,
  user: SMTP_USER,
};

export const LOOPBACK_CONFIGURATION: MailConfiguration = {
  from: FROM_ADDRESS,
  host: MAIL_TRANSPORT.LOOPBACK_HOSTS[0],
  password: "",
  port: Number(LOCAL_PORT),
  requireTLS: false,
  secure: false,
  user: "",
};
