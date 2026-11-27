import { STRING } from "@/app/constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { EXTRA_OCCUPANCY_LIMITS } from "../constants/ExtraOccupancyLimits.constants";
import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";
import type { ExtraOccupancyInput } from "../models/ExtraOccupancyInput.interface";
import type { ExtraOccupancyInputCase } from "./models/ExtraOccupancyInputCase.interface";
import {
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_QUANTITY,
  FAKE_OCCUPIED_QUANTITY_TEXT,
} from "./Extra.constants";

export const VALID_OCCUPANCY_INPUT: ExtraOccupancyInput = {
  occupiesCategoryId: FAKE_OCCUPIED_CATEGORY_ID,
  occupiesQuantity: FAKE_OCCUPIED_QUANTITY_TEXT,
};

export const OCCUPYING_COLUMNS: ExtraOccupancyColumns = {
  occupies_category_id: FAKE_OCCUPIED_CATEGORY_ID,
  occupies_quantity: FAKE_OCCUPIED_QUANTITY,
};

export const CHARGE_ONLY_COLUMNS: ExtraOccupancyColumns = {
  occupies_category_id: null,
  occupies_quantity: null,
};

export const NOT_A_UUID = "not-a-uuid";
export const DECIMAL_QUANTITY = "1.5";
export const ZERO_QUANTITY = "0";
export const NEGATIVE_QUANTITY = "-1";
export const QUANTITY_PAST_THE_LIMIT = `${EXTRA_OCCUPANCY_LIMITS.MAX_QUANTITY + 1}`;
export const NON_TEXT_QUANTITY = 2;

export const EXTRA_OCCUPANCY_INPUT_CASES: ExtraOccupancyInputCase[] =
  [
    {
      description: "a category without a quantity",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: STRING.Empty,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR,
    },
    {
      description: "a quantity without a category",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesCategoryId: STRING.Empty,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR,
    },
    {
      description: "a category that is not a uuid",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesCategoryId: NOT_A_UUID,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.CATEGORY_ERROR,
    },
    {
      description: "a decimal quantity",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: DECIMAL_QUANTITY,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR,
    },
    {
      description: "a zero quantity",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: ZERO_QUANTITY,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR,
    },
    {
      description: "a negative quantity",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: NEGATIVE_QUANTITY,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR,
    },
    {
      description: "a quantity above the maximum",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: QUANTITY_PAST_THE_LIMIT,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR,
    },
    {
      description: "a quantity that is not text",
      input: {
        ...VALID_OCCUPANCY_INPUT,
        occupiesQuantity: NON_TEXT_QUANTITY,
      },
      expectedError: EXTRA_OCCUPANCY_COPY.QUANTITY_ERROR,
    },
  ];
