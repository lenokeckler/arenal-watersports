import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  buildPasswordChangedMail,
  createSmtpMailTransport,
} from "@/app/services/mail";
import { deliverPasswordChangedNoticeQuietly } from "../deliverPasswordChangedNoticeQuietly";
import { readWorkerPersonalEmail } from "../readWorkerPersonalEmail";
import { schedulePasswordChangedNoticeQuietly } from "../schedulePasswordChangedNoticeQuietly";
import { DEFER_FAILURE_MESSAGE } from "./passwordRecovery.constants";
import {
  RESET_EMAIL_READ_FAILURE_MESSAGE,
  RESET_MAIL_FAILURE_MESSAGE,
  RESET_PERSONAL_EMAIL,
  RESET_WORKER_ID,
} from "./passwordRecoveryReset.constants";

vi.mock("../readWorkerPersonalEmail", () => ({
  readWorkerPersonalEmail: vi.fn(),
}));
vi.mock("@/app/services/mail", async (importOriginal) => ({
  ...(await importOriginal<
    typeof import("@/app/services/mail")
  >()),
  createSmtpMailTransport: vi.fn(),
}));

const transport = vi.fn();

describe("deliverPasswordChangedNoticeQuietly", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    transport.mockResolvedValue(undefined);
    vi.mocked(readWorkerPersonalEmail).mockResolvedValue(
      RESET_PERSONAL_EMAIL
    );
  });

  it("sends the changed notice to the registered address", async () => {
    await deliverPasswordChangedNoticeQuietly(
      RESET_WORKER_ID,
      transport
    );

    expect(readWorkerPersonalEmail).toHaveBeenCalledWith(
      RESET_WORKER_ID
    );
    expect(transport).toHaveBeenCalledWith(
      buildPasswordChangedMail({
        personalEmail: RESET_PERSONAL_EMAIL,
      })
    );
  });

  it("creates the default transport lazily", async () => {
    vi.mocked(createSmtpMailTransport).mockReturnValue(
      transport
    );

    await deliverPasswordChangedNoticeQuietly(
      RESET_WORKER_ID
    );

    expect(transport).toHaveBeenCalledOnce();
  });

  it("sends nothing when the worker has no email", async () => {
    vi.mocked(readWorkerPersonalEmail).mockResolvedValue(
      null
    );

    await deliverPasswordChangedNoticeQuietly(
      RESET_WORKER_ID,
      transport
    );

    expect(transport).not.toHaveBeenCalled();
  });

  it("resolves when reading the email fails", async () => {
    vi.mocked(readWorkerPersonalEmail).mockRejectedValue(
      new Error(RESET_EMAIL_READ_FAILURE_MESSAGE)
    );

    await expect(
      deliverPasswordChangedNoticeQuietly(
        RESET_WORKER_ID,
        transport
      )
    ).resolves.toBeUndefined();
    expect(transport).not.toHaveBeenCalled();
  });

  it("resolves when sending fails", async () => {
    transport.mockRejectedValue(
      new Error(RESET_MAIL_FAILURE_MESSAGE)
    );

    await expect(
      deliverPasswordChangedNoticeQuietly(
        RESET_WORKER_ID,
        transport
      )
    ).resolves.toBeUndefined();
  });

  it("resolves when the transport cannot be created", async () => {
    vi.mocked(createSmtpMailTransport).mockImplementation(
      () => {
        throw new Error(RESET_MAIL_FAILURE_MESSAGE);
      }
    );

    await expect(
      deliverPasswordChangedNoticeQuietly(RESET_WORKER_ID)
    ).resolves.toBeUndefined();
  });
});

describe("schedulePasswordChangedNoticeQuietly", () => {
  it("resolves instead of throwing when deferring throws", async () => {
    const defer = vi.fn(() => {
      throw new Error(DEFER_FAILURE_MESSAGE);
    });

    await expect(
      schedulePasswordChangedNoticeQuietly(
        defer,
        RESET_WORKER_ID
      )
    ).resolves.toBeUndefined();
  });

  it("defers one delivery for the worker", async () => {
    const defer = vi.fn();

    await schedulePasswordChangedNoticeQuietly(
      defer,
      RESET_WORKER_ID
    );

    expect(defer).toHaveBeenCalledOnce();
  });
});
