import { describe, expect, it } from "vitest";
import { readPasswordRecoveryResetInput } from "../utils/readPasswordRecoveryResetInput";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import {
  EMPTY_RESET_INPUT,
  RESET_INPUT,
} from "./passwordRecoveryReset.constants";

describe("readPasswordRecoveryResetInput", () => {
  it("reads the username and PIN untouched", () => {
    expect(
      readPasswordRecoveryResetInput(
        createPasswordRecoveryResetFormData(RESET_INPUT)
      )
    ).toEqual(RESET_INPUT);
  });

  it("reads missing fields as empty", () => {
    expect(
      readPasswordRecoveryResetInput(new FormData())
    ).toEqual(EMPTY_RESET_INPUT);
  });
});
