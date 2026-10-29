import { randomUUID } from "node:crypto";
import { STRING } from "@/app/constants";
import { E2E_MAIL_ADDRESS } from "../constants/E2ePasswordRecovery.constants";

export const buildRecoveryAddress = (): string =>
  `${E2E_MAIL_ADDRESS.PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(
      0,
      E2E_MAIL_ADDRESS.SUFFIX_LENGTH
    )}${E2E_MAIL_ADDRESS.DOMAIN}`;
