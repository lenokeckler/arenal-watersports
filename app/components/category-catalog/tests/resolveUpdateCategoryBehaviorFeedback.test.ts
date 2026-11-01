import { describe, expect, it } from "vitest";
import { STATUS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { resolveUpdateCategoryBehaviorFeedback } from "../utils/resolveUpdateCategoryBehaviorFeedback";

const DEFAULT_ERROR_RESULT: CategoryMutationResult = {
  status: CATEGORY_MUTATION_STATUS.ERROR,
};

const SERVER_ERROR_MESSAGE =
  CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR;

describe("resolveUpdateCategoryBehaviorFeedback", () => {
  it("returns the success toast on success", () => {
    const feedback = resolveUpdateCategoryBehaviorFeedback({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });

    expect(feedback).toEqual({
      status: STATUS.SUCCESS,
      message:
        CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST,
    });
  });

  it("returns the error message of a failed result", () => {
    const feedback = resolveUpdateCategoryBehaviorFeedback({
      ...DEFAULT_ERROR_RESULT,
      message: SERVER_ERROR_MESSAGE,
    });

    expect(feedback).toEqual({
      status: STATUS.ERROR,
      message: SERVER_ERROR_MESSAGE,
    });
  });

  it("falls back to the generic error without a message", () => {
    const feedback = resolveUpdateCategoryBehaviorFeedback(
      DEFAULT_ERROR_RESULT
    );

    expect(feedback).toEqual({
      status: STATUS.ERROR,
      message: CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR,
    });
  });

  it("falls back to the generic error with an empty message", () => {
    const feedback = resolveUpdateCategoryBehaviorFeedback({
      ...DEFAULT_ERROR_RESULT,
      message: STRING.Empty,
    });

    expect(feedback).toEqual({
      status: STATUS.ERROR,
      message: CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR,
    });
  });

  it("does not mutate the result", () => {
    const result: CategoryMutationResult = {
      ...DEFAULT_ERROR_RESULT,
      message: SERVER_ERROR_MESSAGE,
    };
    const snapshot = { ...result };

    resolveUpdateCategoryBehaviorFeedback(result);

    expect(result).toEqual(snapshot);
  });
});
