import { describe, expect, it } from "vitest";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_REMOVAL_OUTCOME_COPY } from "../constants/ExtraRemovalOutcomeCopy.constants";
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import { buildReactivationCardResult } from "../utils/buildReactivationCardResult";
import { buildRemovalCardResult } from "../utils/buildRemovalCardResult";
import {
  DEACTIVATED_REMOVAL_RESULT,
  DELETED_REMOVAL_RESULT,
  FAILED_REACTIVATION_RESULT,
  FAILED_REACTIVATION_WITHOUT_MESSAGE,
  FAILED_REMOVAL_RESULT,
  FAKE_REMOVAL_ERROR_MESSAGE,
  SUCCESSFUL_REACTIVATION_RESULT,
} from "./ExtraCardActions.constants";

describe("buildRemovalCardResult", () => {
  it("words a deleted extra with the deleted outcome copy", () => {
    expect(
      buildRemovalCardResult(DELETED_REMOVAL_RESULT)
    ).toEqual({
      message:
        EXTRA_REMOVAL_OUTCOME_COPY[
          EXTRA_REMOVAL_OUTCOME.DELETED
        ],
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("words a deactivated extra with the deactivated outcome copy", () => {
    expect(
      buildRemovalCardResult(DEACTIVATED_REMOVAL_RESULT)
    ).toEqual({
      message:
        EXTRA_REMOVAL_OUTCOME_COPY[
          EXTRA_REMOVAL_OUTCOME.DEACTIVATED
        ],
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("keeps the message of a failed removal", () => {
    expect(
      buildRemovalCardResult(FAILED_REMOVAL_RESULT)
    ).toEqual({
      message: FAKE_REMOVAL_ERROR_MESSAGE,
      status: EXTRA_MUTATION_STATUS.ERROR,
    });
  });
});

describe("buildReactivationCardResult", () => {
  it("words a reactivated extra with the reactivation toast", () => {
    expect(
      buildReactivationCardResult(
        SUCCESSFUL_REACTIVATION_RESULT
      )
    ).toEqual({
      message: EXTRA_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST,
      status: EXTRA_MUTATION_STATUS.SUCCESS,
    });
  });

  it("keeps the message of a failed reactivation", () => {
    expect(
      buildReactivationCardResult(
        FAILED_REACTIVATION_RESULT
      )
    ).toEqual({
      message: FAKE_REMOVAL_ERROR_MESSAGE,
      status: EXTRA_MUTATION_STATUS.ERROR,
    });
  });

  it("falls back to the generic error when the failure has no message", () => {
    expect(
      buildReactivationCardResult(
        FAILED_REACTIVATION_WITHOUT_MESSAGE
      )
    ).toEqual({
      message: EXTRA_CATALOG_COPY.REACTIVATE_GENERIC_ERROR,
      status: EXTRA_MUTATION_STATUS.ERROR,
    });
  });
});
