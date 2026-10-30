import { PASSWORD_LENGTH } from "@/app/constants";

const utf8Encoder = new TextEncoder();

export const isPasswordTooLong = (
  password: string
): boolean =>
  password.length > PASSWORD_LENGTH.MAX ||
  utf8Encoder.encode(password).length >
    PASSWORD_LENGTH.MAX_BYTES;
