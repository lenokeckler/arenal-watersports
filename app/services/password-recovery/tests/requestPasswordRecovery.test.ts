import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { deliverPasswordResetPin } from "../deliverPasswordResetPin";
import { generatePasswordResetPin } from "../generatePasswordResetPin";
import { markPasswordResetPinUndelivered } from "../markPasswordResetPinUndelivered";
import { issuePasswordResetPin } from "../issuePasswordResetPin";
import { requestPasswordRecovery } from "../requestPasswordRecovery";
import {
  DEFER_FAILURE_MESSAGE,
  INVALID_USERNAME,
  ISSUED_PIN,
  NETWORK_KEY_VALUE,
  NORMALIZED_USERNAME,
  REQUEST_PIN,
  RPC_FAILURE,
  UNNORMALIZED_USERNAME,
} from "./passwordRecovery.constants";

vi.mock("../issuePasswordResetPin", () => ({
  issuePasswordResetPin: vi.fn(),
}));
vi.mock("../deliverPasswordResetPin", () => ({
  deliverPasswordResetPin: vi.fn(),
}));
vi.mock("../markPasswordResetPinUndelivered", () => ({
  markPasswordResetPinUndelivered: vi.fn(),
}));
vi.mock("../generatePasswordResetPin", () => ({
  generatePasswordResetPin: vi.fn(),
}));

const defer = vi.fn();

const request = (username: string) =>
  requestPasswordRecovery(
    { networkKey: NETWORK_KEY_VALUE, username },
    defer
  );

describe("requestPasswordRecovery", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(generatePasswordResetPin).mockReturnValue(
      REQUEST_PIN
    );
    vi.mocked(issuePasswordResetPin).mockResolvedValue(
      ISSUED_PIN
    );
    vi.mocked(deliverPasswordResetPin).mockResolvedValue(
      undefined
    );
    vi.mocked(
      markPasswordResetPinUndelivered
    ).mockResolvedValue(undefined);
  });

  it("rejects an invalid username without issuing a pin", async () => {
    const result = await request(INVALID_USERNAME);

    expect(result).toMatchObject({ ok: false });
    expect(issuePasswordResetPin).not.toHaveBeenCalled();
    expect(defer).not.toHaveBeenCalled();
  });

  it("issues the pin for the username and key", async () => {
    await request(UNNORMALIZED_USERNAME);

    expect(issuePasswordResetPin).toHaveBeenCalledWith({
      networkKey: NETWORK_KEY_VALUE,
      pin: REQUEST_PIN,
      username: UNNORMALIZED_USERNAME,
    });
  });

  it("defers one delivery and answers ok when a pin was issued", async () => {
    const result = await request(NORMALIZED_USERNAME);

    expect(result).toEqual({ ok: true });
    expect(defer).toHaveBeenCalledOnce();

    const [task] = defer.mock.calls[0];
    await task();

    expect(deliverPasswordResetPin).toHaveBeenCalledWith(
      ISSUED_PIN,
      REQUEST_PIN
    );
  });

  it("answers the same result without deferring when refused", async () => {
    const issuedResult = await request(NORMALIZED_USERNAME);
    defer.mockClear();
    vi.mocked(issuePasswordResetPin).mockResolvedValue(
      null
    );

    const refusedResult = await request(
      NORMALIZED_USERNAME
    );

    expect(defer).not.toHaveBeenCalled();
    expect(refusedResult).toEqual(issuedResult);
  });

  it("answers unknown without deferring when the call fails", async () => {
    vi.mocked(issuePasswordResetPin).mockRejectedValue(
      RPC_FAILURE
    );

    const result = await request(NORMALIZED_USERNAME);

    expect(result).toMatchObject({
      error: { code: PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN },
      ok: false,
    });
    expect(defer).not.toHaveBeenCalled();
  });

  it("never exposes the pin or the address in the result", async () => {
    const serialized = JSON.stringify(
      await request(NORMALIZED_USERNAME)
    );

    expect(serialized).not.toContain(REQUEST_PIN);
    expect(serialized).not.toContain(
      ISSUED_PIN.personalEmail
    );
  });

  it("does not leak raw errors on failure", async () => {
    vi.mocked(issuePasswordResetPin).mockRejectedValue(
      RPC_FAILURE
    );

    const serialized = JSON.stringify(
      await request(NORMALIZED_USERNAME)
    );

    expect(serialized).not.toContain(RPC_FAILURE.message);
  });

  it("answers like a refusal and marks the pin when deferring throws", async () => {
    vi.mocked(issuePasswordResetPin).mockResolvedValue(
      null
    );
    const refusedResult = await request(
      NORMALIZED_USERNAME
    );
    vi.mocked(issuePasswordResetPin).mockResolvedValue(
      ISSUED_PIN
    );
    defer.mockImplementation(() => {
      throw new Error(DEFER_FAILURE_MESSAGE);
    });

    const result = await request(NORMALIZED_USERNAME);

    expect(result).toEqual(refusedResult);
    expect(
      markPasswordResetPinUndelivered
    ).toHaveBeenCalledWith(ISSUED_PIN.pinId);
  });
});
