import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useUnitFormFields } from "../hooks/useUnitFormFields";
import { buildUnitFormFieldChangeEvent } from "./buildUnitFormFieldChangeEvent";
import {
  buildUnitFormValues,
  DEFAULT_UNIT_FORM_VALUES,
} from "./Unit.constants";
import {
  ALL_FIELD_ERRORS,
  errorsWithout,
  FAKE_CODE_ERROR,
  FIELD_CASES,
} from "./useUnitForm.constants";

const renderFields = () =>
  renderHook(() =>
    useUnitFormFields({
      initialValues: DEFAULT_UNIT_FORM_VALUES,
    })
  );

describe("useUnitFormFields", () => {
  it("starts from the initial values without errors", () => {
    const { result } = renderFields();

    expect(result.current.values).toStrictEqual(
      DEFAULT_UNIT_FORM_VALUES
    );
    expect(result.current.errors).toStrictEqual({});
  });

  it.each(FIELD_CASES)(
    "changes only $field and clears only its own error",
    ({ field, change, value }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors(
          ALL_FIELD_ERRORS
        );
      });

      act(() => {
        result.current[change](
          buildUnitFormFieldChangeEvent({ value })
        );
      });

      expect(result.current.values).toStrictEqual(
        buildUnitFormValues({ [field]: value })
      );
      expect(result.current.errors).toStrictEqual(
        errorsWithout(field)
      );
    }
  );

  it.each(FIELD_CASES)(
    "keeps the same errors when $field has none",
    ({ field, change, value }) => {
      const { result } = renderFields();
      act(() => {
        result.current.showValidationErrors(
          errorsWithout(field)
        );
      });
      const errorsBeforeChange = result.current.errors;

      act(() => {
        result.current[change](
          buildUnitFormFieldChangeEvent({ value })
        );
      });

      expect(result.current.errors).toBe(
        errorsBeforeChange
      );
    }
  );

  it("shows a server code error without touching the other errors", () => {
    const { result } = renderFields();
    act(() => {
      result.current.showValidationErrors(
        errorsWithout("code")
      );
    });

    act(() => {
      result.current.setCodeError(FAKE_CODE_ERROR);
    });

    expect(result.current.errors).toStrictEqual({
      ...errorsWithout("code"),
      code: FAKE_CODE_ERROR,
    });
  });
});
