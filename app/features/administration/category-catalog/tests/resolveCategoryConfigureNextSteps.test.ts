import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "../constants/CategoryConfigureNextStepId.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_STATE } from "../constants/CategoryConfigureNextStepState.constants";
import { resolveCategoryConfigureNextSteps } from "../utils/resolveCategoryConfigureNextSteps";
import {
  buildCategoryConfiguration,
  DEFAULT_CATEGORY_CONFIGURATION,
  FAKE_CONFIGURATION_DEPOSIT_USD,
} from "./CategoryConfiguration.constants";

const { behavior, deposit, image } =
  DEFAULT_CATEGORY_CONFIGURATION;
const NO_STOCK = 0;
const { DEPOSIT, DURATION, PHOTO, STOCK } =
  CATEGORY_CONFIGURE_NEXT_STEP_ID;
const { DONE, OPTIONAL, PENDING } =
  CATEGORY_CONFIGURE_NEXT_STEP_STATE;

describe("resolveCategoryConfigureNextSteps", () => {
  it.each([
    {
      scenario: "a reservable category with nothing set",
      configuration: buildCategoryConfiguration({
        currentQuantity: NO_STOCK,
        behavior: {
          ...behavior,
          defaultDurationMinutes: null,
        },
        image: { ...image, imagePath: null },
      }),
      steps: [
        { id: STOCK, state: PENDING },
        { id: DURATION, state: PENDING },
        { id: PHOTO, state: PENDING },
        { id: DEPOSIT, state: OPTIONAL },
      ],
      doneCount: 0,
      requiredCount: 3,
    },
    {
      scenario:
        "a new reservable category with its default duration",
      configuration: buildCategoryConfiguration({
        currentQuantity: NO_STOCK,
        image: { ...image, imagePath: null },
      }),
      steps: [
        { id: STOCK, state: PENDING },
        { id: DURATION, state: DONE },
        { id: PHOTO, state: PENDING },
        { id: DEPOSIT, state: OPTIONAL },
      ],
      doneCount: 1,
      requiredCount: 3,
    },
    {
      scenario: "everything required done, no deposit",
      configuration: buildCategoryConfiguration(),
      steps: [
        { id: STOCK, state: DONE },
        { id: DURATION, state: DONE },
        { id: PHOTO, state: DONE },
        { id: DEPOSIT, state: OPTIONAL },
      ],
      doneCount: 3,
      requiredCount: 3,
    },
    {
      scenario: "everything done and a deposit set",
      configuration: buildCategoryConfiguration({
        deposit: {
          ...deposit,
          depositUsd: FAKE_CONFIGURATION_DEPOSIT_USD,
        },
      }),
      steps: [
        { id: STOCK, state: DONE },
        { id: DURATION, state: DONE },
        { id: PHOTO, state: DONE },
      ],
      doneCount: 3,
      requiredCount: 3,
    },
    {
      scenario: "an internal category without stock",
      configuration: buildCategoryConfiguration({
        currentQuantity: NO_STOCK,
        behavior: { ...behavior, isReservable: false },
      }),
      steps: [{ id: STOCK, state: PENDING }],
      doneCount: 0,
      requiredCount: 1,
    },
    {
      scenario: "an internal category with stock",
      configuration: buildCategoryConfiguration({
        behavior: { ...behavior, isReservable: false },
      }),
      steps: [{ id: STOCK, state: DONE }],
      doneCount: 1,
      requiredCount: 1,
    },
  ])(
    "resolves $scenario",
    ({
      configuration,
      steps,
      doneCount,
      requiredCount,
    }) => {
      expect(
        resolveCategoryConfigureNextSteps(configuration)
      ).toEqual({ steps, doneCount, requiredCount });
    }
  );
});
