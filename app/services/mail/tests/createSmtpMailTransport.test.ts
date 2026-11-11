import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createTransport } from "nodemailer";
import {
  MAIL_ERROR_CODE,
  MAIL_TRANSPORT,
} from "@/app/constants";
import { createSmtpMailTransport } from "../createSmtpMailTransport";
import {
  BODY,
  FROM_ADDRESS,
  RECIPIENT,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SMTP_USER,
  SMTP_RESPONSE_TEXT,
  SUBJECT,
  UNICODE_LINE_SEPARATORS,
} from "./mail.constants";
import {
  LOOPBACK_CONFIGURATION,
  REMOTE_CONFIGURATION,
} from "./mailConfigurations.constants";

vi.mock("nodemailer", () => ({ createTransport: vi.fn() }));

const sendMail = vi.fn();

describe("createSmtpMailTransport", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createTransport).mockReturnValue({
      sendMail,
    } as never);
    sendMail.mockResolvedValue(undefined);
  });

  it("builds the transporter once with credentials, TLS and timeouts", () => {
    createSmtpMailTransport(REMOTE_CONFIGURATION);

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(createTransport).toHaveBeenCalledWith({
      auth: { user: SMTP_USER, pass: SECRET_PASSWORD },
      connectionTimeout:
        MAIL_TRANSPORT.CONNECTION_TIMEOUT_MILLISECONDS,
      greetingTimeout:
        MAIL_TRANSPORT.GREETING_TIMEOUT_MILLISECONDS,
      host: REMOTE_HOST,
      port: REMOTE_CONFIGURATION.port,
      requireTLS: true,
      secure: false,
      socketTimeout:
        MAIL_TRANSPORT.SOCKET_TIMEOUT_MILLISECONDS,
    });
  });

  it("omits auth for a loopback configuration", () => {
    createSmtpMailTransport(LOOPBACK_CONFIGURATION);

    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        auth: undefined,
        requireTLS: false,
        secure: false,
      })
    );
  });

  it("sends a plain text message from the named sender", async () => {
    const send = createSmtpMailTransport(
      REMOTE_CONFIGURATION
    );

    await send({
      to: RECIPIENT,
      subject: SUBJECT,
      text: BODY,
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith({
      from: `${MAIL_TRANSPORT.SENDER_NAME} <${FROM_ADDRESS}>`,
      subject: SUBJECT,
      text: BODY,
      to: RECIPIENT,
    });
  });

  it("wraps a nodemailer rejection in a code-only error that keeps the cause", async () => {
    const failure = new Error(
      `${REMOTE_HOST} ${SMTP_RESPONSE_TEXT}`
    );
    sendMail.mockRejectedValue(failure);
    const send = createSmtpMailTransport(
      REMOTE_CONFIGURATION
    );

    const error = await send({
      to: RECIPIENT,
      subject: SUBJECT,
      text: BODY,
    }).catch((caught: Error) => caught);

    expect(error).toMatchObject({
      code: MAIL_ERROR_CODE.SEND_FAILED,
      message: MAIL_ERROR_CODE.SEND_FAILED,
    });
    expect((error as Error).message).not.toContain(
      REMOTE_HOST
    );
    expect((error as Error).message).not.toContain(
      SMTP_RESPONSE_TEXT
    );
    expect((error as Error).cause).toBe(failure);
  });

  it.each(UNICODE_LINE_SEPARATORS)(
    "hands a unicode line separator in the subject to nodemailer for header encoding",
    async (separator) => {
      const send = createSmtpMailTransport(
        REMOTE_CONFIGURATION
      );
      const subject = `${SUBJECT}${separator}Bcc: x`;

      await send({ to: RECIPIENT, subject, text: BODY });

      expect(sendMail).toHaveBeenCalledWith(
        expect.objectContaining({ subject })
      );
    }
  );
});
