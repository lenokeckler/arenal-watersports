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
  BLANK_VALUE,
  PADDED_PASSWORD,
  SECRET_PASSWORD,
  SMTP_USER,
  VALID_LOOPBACK_ENVIRONMENT,
  VALID_REMOTE_ENVIRONMENT,
  WHITESPACE_ONLY_PASSWORD,
} from "./mail.constants";
import { stubMailEnvironment } from "./stubMailEnvironment";

describe("readMailConfiguration credentials", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    [SMTP_USER, ""],
    ["", SECRET_PASSWORD],
    [BLANK_VALUE, SECRET_PASSWORD],
  ])(
    "rejects half credentials (user %j, password %j)",
    (user, password) => {
      stubMailEnvironment({
        ...VALID_REMOTE_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_USER]: user,
        [MAIL_ENVIRONMENT.SMTP_PASSWORD]: password,
      });

      expect(
        captureMailError(readMailConfiguration).code
      ).toBe(MAIL_ERROR_CODE.CREDENTIALS_INCOMPLETE);
    }
  );

  it("rejects a remote host without credentials", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_USER]: "",
      [MAIL_ENVIRONMENT.SMTP_PASSWORD]: "",
    });

    expect(
      captureMailError(readMailConfiguration).code
    ).toBe(MAIL_ERROR_CODE.CREDENTIALS_REQUIRED);
  });

  it("treats an unset user and password as absent", () => {
    stubMailEnvironment(VALID_LOOPBACK_ENVIRONMENT);
    vi.stubEnv(MAIL_ENVIRONMENT.SMTP_USER, undefined);
    vi.stubEnv(MAIL_ENVIRONMENT.SMTP_PASSWORD, undefined);

    expect(readMailConfiguration()).toMatchObject({
      password: "",
      user: "",
    });
  });

  it("keeps the password exactly as written", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PASSWORD]: PADDED_PASSWORD,
    });

    expect(readMailConfiguration().password).toBe(
      PADDED_PASSWORD
    );
  });

  it("counts a whitespace-only password as present", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PASSWORD]:
        WHITESPACE_ONLY_PASSWORD,
    });

    expect(readMailConfiguration().password).toBe(
      WHITESPACE_ONLY_PASSWORD
    );
  });
});
