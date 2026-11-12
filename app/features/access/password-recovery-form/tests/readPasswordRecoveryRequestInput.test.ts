import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { readPasswordRecoveryRequestInput } from "../utils/readPasswordRecoveryRequestInput";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import {
  EMPTY_USERNAME,
  RAW_USERNAME,
} from "./passwordRecoveryRequest.constants";

describe("readPasswordRecoveryRequestInput", () => {
  it("reads the posted username untouched", () => {
    expect(
      readPasswordRecoveryRequestInput(
        createPasswordRecoveryRequestFormData(RAW_USERNAME)
      )
    ).toEqual({ username: RAW_USERNAME });
  });

  it("reads a missing username as empty", () => {
    expect(
      readPasswordRecoveryRequestInput(new FormData())
    ).toEqual({ username: EMPTY_USERNAME });
  });

  it("reads a posted file as empty", () => {
    const formData = new FormData();
    formData.set(
      PASSWORD_RECOVERY_FIELD.USERNAME,
      new File([], RAW_USERNAME)
    );

    expect(
      readPasswordRecoveryRequestInput(formData)
    ).toEqual({ username: EMPTY_USERNAME });
  });
});
