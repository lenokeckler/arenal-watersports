import { describe, expect, it } from "vitest";
import {
  PERSONAL_EMAIL_FIELD,
  STRING,
} from "@/app/constants";
import { EMPTY_PERSONAL_EMAIL_INPUT } from "../constants/PersonalEmailFormDefaults.constants";
import { readPersonalEmailInput } from "../utils/readPersonalEmailInput";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import {
  FORGED_IDENTITY_FIELD,
  FORGED_IDENTITY_VALUE,
  OTHER_INTENT,
  REMOVE_INPUT,
  SAVE_INPUT,
  SECOND_ADDRESS,
  UPLOADED_FILE_CONTENT,
  UPLOADED_FILE_NAME,
  UPPERCASE_SAVE_INTENT,
} from "./personalEmailForm.constants";

describe("readPersonalEmailInput", () => {
  it("reads the three posted fields", () => {
    expect(
      readPersonalEmailInput(
        createPersonalEmailFormData(SAVE_INPUT)
      )
    ).toEqual(SAVE_INPUT);
  });

  it("reads the remove intent as posted", () => {
    expect(
      readPersonalEmailInput(
        createPersonalEmailFormData(REMOVE_INPUT)
      ).intent
    ).toBe(REMOVE_INPUT.intent);
  });

  it("keeps an intent outside the closed set as raw text", () => {
    expect(
      readPersonalEmailInput(
        createPersonalEmailFormData({
          ...SAVE_INPUT,
          intent: OTHER_INTENT,
        })
      ).intent
    ).toBe(OTHER_INTENT);
  });

  it("reads missing fields as empty text", () => {
    expect(readPersonalEmailInput(new FormData())).toEqual(
      EMPTY_PERSONAL_EMAIL_INPUT
    );
  });

  it("reads a field that is not text as empty text", () => {
    const formData =
      createPersonalEmailFormData(SAVE_INPUT);
    formData.set(
      PERSONAL_EMAIL_FIELD.EMAIL,
      new File([UPLOADED_FILE_CONTENT], UPLOADED_FILE_NAME)
    );

    expect(readPersonalEmailInput(formData).email).toBe(
      STRING.Empty
    );
  });

  it("ignores any identity posted with the form", () => {
    const formData =
      createPersonalEmailFormData(SAVE_INPUT);
    formData.set(
      FORGED_IDENTITY_FIELD,
      FORGED_IDENTITY_VALUE
    );

    expect(readPersonalEmailInput(formData)).toEqual(
      SAVE_INPUT
    );
  });

  it("keeps an uppercase intent as raw text", () => {
    expect(
      readPersonalEmailInput(
        createPersonalEmailFormData({
          ...SAVE_INPUT,
          intent: UPPERCASE_SAVE_INTENT,
        })
      ).intent
    ).toBe(UPPERCASE_SAVE_INTENT);
  });

  it("reads the first value of a repeated field", () => {
    const formData =
      createPersonalEmailFormData(SAVE_INPUT);
    formData.append(
      PERSONAL_EMAIL_FIELD.EMAIL,
      SECOND_ADDRESS
    );

    expect(readPersonalEmailInput(formData).email).toBe(
      SAVE_INPUT.email
    );
  });
});
