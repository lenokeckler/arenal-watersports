import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  buildPasswordResetPinMail,
  createSmtpMailTransport,
} from "@/app/services/mail";
import { deliverPasswordResetPin } from "../deliverPasswordResetPin";
import { markPasswordResetPinUndelivered } from "../markPasswordResetPinUndelivered";
import {
  ISSUED_PIN,
  MARK_FAILURE_MESSAGE,
  MISSING_MAIL_ENVIRONMENT_MESSAGE,
  REQUEST_PIN,
  TRANSPORT_FAILURE_MESSAGE,
} from "./passwordRecovery.constants";

vi.mock("@/app/services/mail", async (importOriginal) => ({
  ...(await importOriginal<
    typeof import("@/app/services/mail")
  >()),
  createSmtpMailTransport: vi.fn(),
}));

vi.mock("../markPasswordResetPinUndelivered", () => ({
  markPasswordResetPinUndelivered: vi.fn(),
}));

const transport = vi.fn();

describe("deliverPasswordResetPin", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    transport.mockResolvedValue(undefined);
    vi.mocked(
      markPasswordResetPinUndelivered
    ).mockResolvedValue(undefined);
  });

  it("sends the built mail to the registered address", async () => {
    await deliverPasswordResetPin(
      ISSUED_PIN,
      REQUEST_PIN,
      transport
    );

    expect(transport).toHaveBeenCalledOnce();
    expect(transport).toHaveBeenCalledWith(
      buildPasswordResetPinMail({
        lifetimeMinutes: ISSUED_PIN.lifetimeMinutes,
        personalEmail: ISSUED_PIN.personalEmail,
        pin: REQUEST_PIN,
      })
    );
    expect(
      markPasswordResetPinUndelivered
    ).not.toHaveBeenCalled();
  });

  it("creates the default transport lazily", async () => {
    vi.mocked(createSmtpMailTransport).mockReturnValue(
      transport
    );

    await deliverPasswordResetPin(ISSUED_PIN, REQUEST_PIN);

    expect(createSmtpMailTransport).toHaveBeenCalledOnce();
    expect(transport).toHaveBeenCalledOnce();
  });

  it("marks the pin undelivered and resolves when sending fails", async () => {
    transport.mockRejectedValue(
      new Error(TRANSPORT_FAILURE_MESSAGE)
    );

    await expect(
      deliverPasswordResetPin(
        ISSUED_PIN,
        REQUEST_PIN,
        transport
      )
    ).resolves.toBeUndefined();
    expect(
      markPasswordResetPinUndelivered
    ).toHaveBeenCalledWith(ISSUED_PIN.pinId);
  });

  it("still resolves when marking the pin also fails", async () => {
    transport.mockRejectedValue(
      new Error(TRANSPORT_FAILURE_MESSAGE)
    );
    vi.mocked(
      markPasswordResetPinUndelivered
    ).mockRejectedValue(new Error(MARK_FAILURE_MESSAGE));

    await expect(
      deliverPasswordResetPin(
        ISSUED_PIN,
        REQUEST_PIN,
        transport
      )
    ).resolves.toBeUndefined();
  });

  it("marks the pin and resolves when the transport cannot be created", async () => {
    vi.mocked(createSmtpMailTransport).mockImplementation(
      () => {
        throw new Error(MISSING_MAIL_ENVIRONMENT_MESSAGE);
      }
    );

    await expect(
      deliverPasswordResetPin(ISSUED_PIN, REQUEST_PIN)
    ).resolves.toBeUndefined();
    expect(
      markPasswordResetPinUndelivered
    ).toHaveBeenCalledWith(ISSUED_PIN.pinId);
  });
});
