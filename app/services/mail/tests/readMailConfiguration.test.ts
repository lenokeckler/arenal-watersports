import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  MAIL_ENVIRONMENT,
  MAIL_ERROR_CODE,
} from "@/app/constants";
import { MailError } from "../MailError";
import { readMailConfiguration } from "../readMailConfiguration";
import {
  FROM_ADDRESS,
  IMPLICIT_TLS_PORT,
  INVALID_PORTS,
  LOOPBACK_HOSTS,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SMTP_USER,
  SUBMISSION_PORT,
  VALID_LOOPBACK_ENVIRONMENT,
  VALID_REMOTE_ENVIRONMENT,
} from "./mail.constants";

const stubEnvironment = (
  values: Record<string, string>
): void => {
  Object.entries(values).forEach(([name, value]) =>
    vi.stubEnv(name, value)
  );
};

const captureError = (): MailError => {
  try {
    readMailConfiguration();
  } catch (error) {
    return error as MailError;
  }

  throw new Error(
    "expected readMailConfiguration to throw"
  );
};

describe("readMailConfiguration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads a remote submission configuration with required STARTTLS", () => {
    stubEnvironment(VALID_REMOTE_ENVIRONMENT);

    expect(readMailConfiguration()).toEqual({
      from: FROM_ADDRESS,
      host: REMOTE_HOST,
      password: SECRET_PASSWORD,
      port: Number(SUBMISSION_PORT),
      requireTLS: true,
      secure: false,
      user: SMTP_USER,
    });
  });

  it("uses implicit TLS on the implicit TLS port", () => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: IMPLICIT_TLS_PORT,
    });

    const configuration = readMailConfiguration();

    expect(configuration.secure).toBe(true);
    expect(configuration.requireTLS).toBe(false);
  });

  it.each(LOOPBACK_HOSTS)(
    "allows plain delivery without credentials to %s",
    (host) => {
      stubEnvironment({
        ...VALID_LOOPBACK_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_HOST]: host,
      });

      const configuration = readMailConfiguration();

      expect(configuration.secure).toBe(false);
      expect(configuration.requireTLS).toBe(false);
      expect(configuration.user).toBe("");
    }
  );

  it.each([
    [
      MAIL_ENVIRONMENT.SMTP_HOST,
      MAIL_ERROR_CODE.HOST_MISSING,
    ],
    [
      MAIL_ENVIRONMENT.SMTP_PORT,
      MAIL_ERROR_CODE.PORT_MISSING,
    ],
    [
      MAIL_ENVIRONMENT.FROM_ADDRESS,
      MAIL_ERROR_CODE.FROM_MISSING,
    ],
  ])("throws when %s is empty", (name, code) => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [name]: "",
    });

    expect(captureError().code).toBe(code);
  });

  it.each(INVALID_PORTS)("rejects the port %s", (port) => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: port,
    });

    expect(captureError().code).toBe(
      MAIL_ERROR_CODE.PORT_INVALID
    );
  });

  it.each([
    [SMTP_USER, ""],
    ["", SECRET_PASSWORD],
  ])(
    "rejects half credentials (user %s, password set: %s)",
    (user, password) => {
      stubEnvironment({
        ...VALID_REMOTE_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_USER]: user,
        [MAIL_ENVIRONMENT.SMTP_PASSWORD]: password,
      });

      expect(captureError().code).toBe(
        MAIL_ERROR_CODE.CREDENTIALS_INCOMPLETE
      );
    }
  );

  it("rejects a remote host without credentials", () => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_USER]: "",
      [MAIL_ENVIRONMENT.SMTP_PASSWORD]: "",
    });

    expect(captureError().code).toBe(
      MAIL_ERROR_CODE.CREDENTIALS_REQUIRED
    );
  });

  it("rejects a sender address containing a line break", () => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.FROM_ADDRESS]: `${FROM_ADDRESS}\r\nBcc: x`,
    });

    expect(captureError().code).toBe(
      MAIL_ERROR_CODE.FROM_INVALID
    );
  });

  it("never echoes the host, password or user in the error", () => {
    stubEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: INVALID_PORTS[0],
    });

    const { message } = captureError();

    expect(message).not.toContain(REMOTE_HOST);
    expect(message).not.toContain(SECRET_PASSWORD);
    expect(message).not.toContain(SMTP_USER);
  });
});
