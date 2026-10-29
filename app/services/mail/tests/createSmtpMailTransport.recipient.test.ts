import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createTransport } from "nodemailer";
import { MAIL_ERROR_CODE } from "@/app/constants";
import { createSmtpMailTransport } from "../createSmtpMailTransport";
import {
  BODY,
  INVALID_RECIPIENTS,
  LINE_BREAK_VALUES,
  RECIPIENT,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SUBJECT,
} from "./mail.constants";
import { REMOTE_CONFIGURATION } from "./mailConfigurations.constants";

vi.mock("nodemailer", () => ({ createTransport: vi.fn() }));

const sendMail = vi.fn();

describe("createSmtpMailTransport message validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createTransport).mockReturnValue({
      sendMail,
    } as never);
    sendMail.mockResolvedValue(undefined);
  });

  it.each(LINE_BREAK_VALUES)(
    "rejects a recipient with a line break without sending: %j",
    async (to) => {
      const send = createSmtpMailTransport(
        REMOTE_CONFIGURATION
      );

      await expect(
        send({ to, subject: SUBJECT, text: BODY })
      ).rejects.toMatchObject({
        code: MAIL_ERROR_CODE.HEADER_INJECTION,
      });
      expect(sendMail).not.toHaveBeenCalled();
    }
  );

  it.each(LINE_BREAK_VALUES)(
    "rejects a subject with a line break without sending: %j",
    async (subject) => {
      const send = createSmtpMailTransport(
        REMOTE_CONFIGURATION
      );

      await expect(
        send({ to: RECIPIENT, subject, text: BODY })
      ).rejects.toMatchObject({
        code: MAIL_ERROR_CODE.HEADER_INJECTION,
      });
      expect(sendMail).not.toHaveBeenCalled();
    }
  );

  it.each(INVALID_RECIPIENTS)(
    "rejects a recipient that is not one plain address without sending: %j",
    async (to) => {
      const send = createSmtpMailTransport(
        REMOTE_CONFIGURATION
      );

      await expect(
        send({ to, subject: SUBJECT, text: BODY })
      ).rejects.toMatchObject({
        code: MAIL_ERROR_CODE.RECIPIENT_INVALID,
      });
      expect(sendMail).not.toHaveBeenCalled();
    }
  );

  it("never echoes the password or host in a validation error", async () => {
    const send = createSmtpMailTransport(
      REMOTE_CONFIGURATION
    );

    const error = await send({
      to: LINE_BREAK_VALUES[0],
      subject: SUBJECT,
      text: BODY,
    }).catch((caught: Error) => caught);

    expect((error as Error).message).not.toContain(
      SECRET_PASSWORD
    );
    expect((error as Error).message).not.toContain(
      REMOTE_HOST
    );
  });
});
