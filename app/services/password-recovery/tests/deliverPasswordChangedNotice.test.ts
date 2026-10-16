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
import { deliverPasswordChangedNotice } from "../deliverPasswordChangedNotice";
import { readWorkerPersonalEmail } from "../readWorkerPersonalEmail";
import { schedulePasswordChangedNotice } from "../schedulePasswordChangedNotice";
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

describe("deliverPasswordChangedNotice", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    transport.mockResolvedValue(undefined);
    vi.mocked(readWorkerPersonalEmail).mockResolvedValue(
      RESET_PERSONAL_EMAIL
    );
  });

  it("sends the changed notice to the registered address", async () => {
    await deliverPasswordChangedNotice(
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

    await deliverPasswordChangedNotice(RESET_WORKER_ID);

    expect(transport).toHaveBeenCalledOnce();
  });

  it("sends nothing when the worker has no email", async () => {
    vi.mocked(readWorkerPersonalEmail).mockResolvedValue(
      null
    );

    await deliverPasswordChangedNotice(
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
      deliverPasswordChangedNotice(
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
      deliverPasswordChangedNotice(
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
      deliverPasswordChangedNotice(RESET_WORKER_ID)
    ).resolves.toBeUndefined();
  });
});

describe("schedulePasswordChangedNotice", () => {
  it("reports false instead of throwing when deferring throws", () => {
    const defer = vi.fn(() => {
      throw new Error(DEFER_FAILURE_MESSAGE);
    });

    expect(
      schedulePasswordChangedNotice(defer, RESET_WORKER_ID)
    ).toBe(false);
  });

  it("reports true when the notice was deferred", () => {
    const defer = vi.fn();

    expect(
      schedulePasswordChangedNotice(defer, RESET_WORKER_ID)
    ).toBe(true);
    expect(defer).toHaveBeenCalledOnce();
  });
});
