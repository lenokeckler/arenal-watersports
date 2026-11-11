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
import { readMailConfiguration } from "../readMailConfiguration";
import { captureMailError } from "./captureMailError";
import {
  BOUNDARY_PORTS,
  FROM_ADDRESS,
  INVALID_PORTS,
  NON_DECIMAL_PORTS,
  PADDED_PORT,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SMTP_USER,
  SUBMISSION_PORT,
  VALID_REMOTE_ENVIRONMENT,
} from "./mail.constants";
import { stubMailEnvironment } from "./stubMailEnvironment";

describe("readMailConfiguration required values", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reads a complete remote configuration", () => {
    stubMailEnvironment(VALID_REMOTE_ENVIRONMENT);

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
  ])("throws when %s is empty or unset", (name, code) => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [name]: "",
    });
    const emptyCode = captureMailError(
      readMailConfiguration
    ).code;

    vi.stubEnv(name, undefined);

    expect(emptyCode).toBe(code);
    expect(
      captureMailError(readMailConfiguration).code
    ).toBe(code);
  });

  it.each([...INVALID_PORTS, ...NON_DECIMAL_PORTS])(
    "rejects the port %s",
    (port) => {
      stubMailEnvironment({
        ...VALID_REMOTE_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_PORT]: port,
      });

      expect(
        captureMailError(readMailConfiguration).code
      ).toBe(MAIL_ERROR_CODE.PORT_INVALID);
    }
  );

  it.each(BOUNDARY_PORTS)(
    "accepts the boundary port %s",
    (port) => {
      stubMailEnvironment({
        ...VALID_REMOTE_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_PORT]: port,
      });

      expect(readMailConfiguration().port).toBe(
        Number(port)
      );
    }
  );

  it("trims whitespace around the port", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: PADDED_PORT,
    });

    expect(readMailConfiguration().port).toBe(
      Number(SUBMISSION_PORT)
    );
  });

  it("never echoes the host, password or user in the error", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: INVALID_PORTS[0],
    });

    const { message } = captureMailError(
      readMailConfiguration
    );

    expect(message).not.toContain(REMOTE_HOST);
    expect(message).not.toContain(SECRET_PASSWORD);
    expect(message).not.toContain(SMTP_USER);
  });
});
