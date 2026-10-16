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
import type { MailConfiguration } from "../models/MailConfiguration.interface";
import {
  BODY,
  FROM_ADDRESS,
  LINE_BREAK_VALUES,
  RECIPIENT,
  REMOTE_HOST,
  SECRET_PASSWORD,
  SMTP_USER,
  SUBJECT,
} from "./mail.constants";

vi.mock("nodemailer", () => ({ createTransport: vi.fn() }));

const sendMail = vi.fn();

const remoteConfiguration: MailConfiguration = {
  from: FROM_ADDRESS,
  host: REMOTE_HOST,
  password: SECRET_PASSWORD,
  port: 587,
  requireTLS: true,
  secure: false,
  user: SMTP_USER,
};

const loopbackConfiguration: MailConfiguration = {
  from: FROM_ADDRESS,
  host: "127.0.0.1",
  password: "",
  port: 54325,
  requireTLS: false,
  secure: false,
  user: "",
};

describe("createSmtpMailTransport", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createTransport).mockReturnValue({
      sendMail,
    } as never);
    sendMail.mockResolvedValue(undefined);
  });

  it("builds the transporter once with credentials, TLS and timeouts", () => {
    createSmtpMailTransport(remoteConfiguration);

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(createTransport).toHaveBeenCalledWith({
      auth: { user: SMTP_USER, pass: SECRET_PASSWORD },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      host: REMOTE_HOST,
      port: 587,
      requireTLS: true,
      secure: false,
      socketTimeout: 10000,
    });
  });

  it("omits auth for a loopback configuration", () => {
    createSmtpMailTransport(loopbackConfiguration);

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
      remoteConfiguration
    );

    await send({
      to: RECIPIENT,
      subject: SUBJECT,
      text: BODY,
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith({
      from: `Arenal Water Sports <${FROM_ADDRESS}>`,
      subject: SUBJECT,
      text: BODY,
      to: RECIPIENT,
    });
  });

  it("propagates a rejection from nodemailer", async () => {
    const failure = new Error("connection refused");
    sendMail.mockRejectedValue(failure);
    const send = createSmtpMailTransport(
      remoteConfiguration
    );

    await expect(
      send({ to: RECIPIENT, subject: SUBJECT, text: BODY })
    ).rejects.toBe(failure);
  });

  it.each(LINE_BREAK_VALUES)(
    "rejects a recipient with a line break without sending",
    async (to) => {
      const send = createSmtpMailTransport(
        remoteConfiguration
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
    "rejects a subject with a line break without sending",
    async (subject) => {
      const send = createSmtpMailTransport(
        remoteConfiguration
      );

      await expect(
        send({ to: RECIPIENT, subject, text: BODY })
      ).rejects.toMatchObject({
        code: MAIL_ERROR_CODE.HEADER_INJECTION,
      });
      expect(sendMail).not.toHaveBeenCalled();
    }
  );

  it("never echoes the password or host in the injection error", async () => {
    const send = createSmtpMailTransport(
      remoteConfiguration
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
