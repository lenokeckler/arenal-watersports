import { describe, expect, it } from "vitest";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { resolveCategoryUpdateResult } from "../utils/resolveCategoryUpdateResult";

const NOT_FOUND_MESSAGE = "no encontrada";

describe("resolveCategoryUpdateResult", () => {
  it("is a success when a row was updated", () => {
    expect(
      resolveCategoryUpdateResult(true, NOT_FOUND_MESSAGE)
    ).toEqual({ status: CATEGORY_MUTATION_STATUS.SUCCESS });
  });

  it("carries the given not-found message when no row matched", () => {
    expect(
      resolveCategoryUpdateResult(false, NOT_FOUND_MESSAGE)
    ).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message: NOT_FOUND_MESSAGE,
    });
  });
});
