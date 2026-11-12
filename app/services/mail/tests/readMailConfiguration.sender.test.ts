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
  FROM_ADDRESS,
  FROM_WITH_EXTRA_MAILBOX,
  LINE_BREAK_VALUES,
  UNTRIMMED_INVALID_SENDERS,
  VALID_REMOTE_ENVIRONMENT,
} from "./mail.constants";
import { stubMailEnvironment } from "./stubMailEnvironment";

describe("readMailConfiguration sender", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts one plain address", () => {
    stubMailEnvironment(VALID_REMOTE_ENVIRONMENT);

    expect(readMailConfiguration().from).toBe(FROM_ADDRESS);
  });

  it.each([
    `${FROM_ADDRESS}\r\nBcc: x`,
    FROM_WITH_EXTRA_MAILBOX,
    ...LINE_BREAK_VALUES,
    ...UNTRIMMED_INVALID_SENDERS,
  ])("rejects the sender %j", (from) => {
    stubMailEnvironment({
      ...VALID_REMOTE_ENVIRONMENT,
      [MAIL_ENVIRONMENT.FROM_ADDRESS]: from,
    });

    expect(
      captureMailError(readMailConfiguration).code
    ).toBe(MAIL_ERROR_CODE.FROM_INVALID);
  });
});
