import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PASSWORD_RESET_PIN } from "@/app/constants";
import { generatePasswordResetPin } from "../generatePasswordResetPin";
import {
  GENERATION_SAMPLE_SIZE,
  PIN_BOUND,
  SMALL_RANDOM_PIN,
  SMALL_RANDOM_VALUE,
} from "./passwordRecovery.constants";

const { randomIntMock } = vi.hoisted(() => ({
  randomIntMock: vi.fn(),
}));

vi.mock("node:crypto", () => ({
  default: { randomInt: randomIntMock },
  randomInt: randomIntMock,
}));

describe("generatePasswordResetPin", () => {
  beforeEach(async () => {
    const original =
      await vi.importActual<typeof import("node:crypto")>(
        "node:crypto"
      );

    randomIntMock.mockReset();
    randomIntMock.mockImplementation(original.randomInt);
  });

  it("always returns the configured number of digits", () => {
    for (
      let index = 0;
      index < GENERATION_SAMPLE_SIZE;
      index += 1
    ) {
      const pin = generatePasswordResetPin();

      expect(pin).toMatch(PASSWORD_RESET_PIN.PATTERN);
      expect(pin).toHaveLength(PASSWORD_RESET_PIN.LENGTH);
    }
  });

  it("keeps leading zeros", () => {
    randomIntMock.mockReturnValueOnce(SMALL_RANDOM_VALUE);

    expect(generatePasswordResetPin()).toBe(
      SMALL_RANDOM_PIN
    );
  });

  it("draws from the secure generator over the exact bound", () => {
    generatePasswordResetPin();

    expect(randomIntMock).toHaveBeenCalledOnce();
    expect(randomIntMock).toHaveBeenCalledWith(
      0,
      PIN_BOUND
    );
  });
});
