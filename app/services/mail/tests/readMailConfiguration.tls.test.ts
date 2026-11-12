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
  MAIL_TRANSPORT,
} from "@/app/constants";
import { readMailConfiguration } from "../readMailConfiguration";
import { captureMailError } from "./captureMailError";
import {
  IMPLICIT_TLS_PORT,
  LOOKALIKE_LOOPBACK_HOSTS,
  VALID_LOOPBACK_ENVIRONMENT,
  VALID_REMOTE_ENVIRONMENT,
} from "./mail.constants";
import { stubMailEnvironment } from "./stubMailEnvironment";

describe("readMailConfiguration transport security", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("requires STARTTLS on a remote submission port", () => {
    stubMailEnvironment(VALID_REMOTE_ENVIRONMENT);

    expect(readMailConfiguration()).toMatchObject({
      requireTLS: true,
      secure: false,
    });
  });

  it("uses implicit TLS on the implicit TLS port", () => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.SMTP_PORT]: IMPLICIT_TLS_PORT,
    });

    expect(readMailConfiguration()).toMatchObject({
      requireTLS: false,
      secure: true,
    });
  });

  it.each(MAIL_TRANSPORT.LOOPBACK_HOSTS)(
    "allows plain delivery without credentials to %s",
    (host) => {
      stubMailEnvironment({
        ...VALID_LOOPBACK_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_HOST]: host,
      });

      expect(readMailConfiguration()).toMatchObject({
        requireTLS: false,
        secure: false,
        user: "",
      });
    }
  );

  it.each(LOOKALIKE_LOOPBACK_HOSTS)(
    "treats %s as remote and demands credentials",
    (host) => {
      stubMailEnvironment({
        ...VALID_LOOPBACK_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_HOST]: host,
      });

      expect(
        captureMailError(readMailConfiguration).code
      ).toBe(MAIL_ERROR_CODE.CREDENTIALS_REQUIRED);
    }
  );

  it.each(LOOKALIKE_LOOPBACK_HOSTS)(
    "requires STARTTLS to %s",
    (host) => {
      stubMailEnvironment({
        ...VALID_REMOTE_ENVIRONMENT,
        [MAIL_ENVIRONMENT.SMTP_HOST]: host,
      });

      expect(readMailConfiguration().requireTLS).toBe(true);
    }
  );
});
