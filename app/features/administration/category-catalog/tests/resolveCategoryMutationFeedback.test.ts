import { describe, expect, it } from "vitest";
import { STATUS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { resolveCategoryMutationFeedback } from "../utils/resolveCategoryMutationFeedback";

const DEFAULT_ERROR_RESULT: CategoryMutationResult = {
  status: CATEGORY_MUTATION_STATUS.ERROR,
};

const SUCCESS_MESSAGES = [
  CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST,
  CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST,
];

const SERVER_ERROR_MESSAGE =
  CATEGORY_CATALOG_COPY.DEPOSIT_CATEGORY_NOT_FOUND_ERROR;

describe("resolveCategoryMutationFeedback", () => {
  it.each(SUCCESS_MESSAGES)(
    "returns the given success message on success: %s",
    (successMessage) => {
      const feedback = resolveCategoryMutationFeedback(
        { status: CATEGORY_MUTATION_STATUS.SUCCESS },
        successMessage
      );

      expect(feedback).toEqual({
        status: STATUS.SUCCESS,
        message: successMessage,
      });
    }
  );

  it("returns the error message of a failed result", () => {
    const feedback = resolveCategoryMutationFeedback(
      {
        ...DEFAULT_ERROR_RESULT,
        message: SERVER_ERROR_MESSAGE,
      },
      CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
    );

    expect(feedback).toEqual({
      status: STATUS.ERROR,
      message: SERVER_ERROR_MESSAGE,
    });
  });

  it.each([undefined, STRING.Empty])(
    "falls back to the generic error when the message is %j",
    (message) => {
      const feedback = resolveCategoryMutationFeedback(
        { ...DEFAULT_ERROR_RESULT, message },
        CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
      );

      expect(feedback).toEqual({
        status: STATUS.ERROR,
        message:
          CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR,
      });
    }
  );

  it("does not mutate the result", () => {
    const result: CategoryMutationResult = {
      ...DEFAULT_ERROR_RESULT,
      message: SERVER_ERROR_MESSAGE,
    };
    const snapshot = { ...result };

    resolveCategoryMutationFeedback(
      result,
      CATEGORY_CATALOG_COPY.DEPOSIT_UPDATE_SUCCESS_TOAST
    );

    expect(result).toEqual(snapshot);
  });
});
