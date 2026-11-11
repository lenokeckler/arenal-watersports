import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { readTextField } from "../readTextField";
import {
  FIELD_NAME,
  FIELD_VALUE,
  MISSING_FIELD_NAME,
  SECOND_VALUE,
  UPLOADED_FILE_CONTENT,
  UPLOADED_FILE_NAME,
} from "./readTextField.constants";

describe("readTextField", () => {
  it("reads the posted text", () => {
    const formData = new FormData();
    formData.set(FIELD_NAME, FIELD_VALUE);

    expect(readTextField(formData, FIELD_NAME)).toBe(
      FIELD_VALUE
    );
  });

  it("reads a missing field as empty text", () => {
    expect(
      readTextField(new FormData(), MISSING_FIELD_NAME)
    ).toBe(STRING.Empty);
  });

  it("reads a field that is not text as empty text", () => {
    const formData = new FormData();
    formData.set(
      FIELD_NAME,
      new File([UPLOADED_FILE_CONTENT], UPLOADED_FILE_NAME)
    );

    expect(readTextField(formData, FIELD_NAME)).toBe(
      STRING.Empty
    );
  });

  it("reads the first value of a repeated field", () => {
    const formData = new FormData();
    formData.append(FIELD_NAME, FIELD_VALUE);
    formData.append(FIELD_NAME, SECOND_VALUE);

    expect(readTextField(formData, FIELD_NAME)).toBe(
      FIELD_VALUE
    );
  });
});
