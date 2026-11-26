import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import CategoryBehaviorForm from "../CategoryBehaviorForm";
import { CATEGORY_BEHAVIOR_FORM_FIELD_ID } from "../constants/CategoryBehaviorFormFieldId.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { mapCategoryBehaviorFormValuesToInput } from "../utils/mapCategoryBehaviorFormValuesToInput";
import { parseLowFuelLines } from "../utils/parseLowFuelLines";
import { validateCategoryBehaviorFormValues } from "../utils/validateCategoryBehaviorFormValues";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import { FAKE_UPDATE_CATEGORY_ID } from "./UpdateCategoryBehaviorInput.constants";

const mockUpdate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

vi.mock("../services/updateCategoryBehaviorAction", () => ({
  updateCategoryBehaviorAction: (input: unknown) =>
    mockUpdate(input),
}));

const LINES = {
  ABOVE: "21",
  FRACTION: "1.5",
  LETTERS: "a",
  TWO: "2",
  TWO_NUMBER: 2,
  ZERO: "0",
} as const;

const getLowFuelField = () =>
  screen.getByLabelText<HTMLInputElement>(
    CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_LABEL
  );

describe("parseLowFuelLines", () => {
  it("reads a whole number of lines from 1 to 20", () => {
    expect(parseLowFuelLines(LINES.TWO)).toBe(
      LINES.TWO_NUMBER
    );
    expect(parseLowFuelLines(" 2 ")).toBe(LINES.TWO_NUMBER);
  });

  it.each([
    LINES.ZERO,
    LINES.ABOVE,
    LINES.FRACTION,
    LINES.LETTERS,
    "",
  ])("reads %j as no valid number of lines", (text) => {
    expect(parseLowFuelLines(text)).toBeNull();
  });
});

describe("low fuel warning of a category", () => {
  it("is part of the form values and goes to the input", () => {
    expect(
      mapCategoryBehaviorFormValuesToInput(
        FAKE_UPDATE_CATEGORY_ID,
        {
          ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
          lowFuelLines: LINES.TWO,
        }
      ).lowFuelLines
    ).toBe(LINES.TWO_NUMBER);
  });

  it("is required only when the category consumes fuel", () => {
    expect(
      validateCategoryBehaviorFormValues({
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        consumesFuel: true,
        lowFuelLines: "",
      })
    ).toEqual({
      lowFuelLines:
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_INVALID_ERROR,
    });
    expect(
      validateCategoryBehaviorFormValues({
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        consumesFuel: false,
        lowFuelLines: "",
      })
    ).toEqual({});
  });
});

describe("low fuel warning field", () => {
  beforeEach(() => {
    mockUpdate.mockReset();
    mockUpdate.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("shows the category value when the category consumes fuel", () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );

    expect(getLowFuelField().value).toBe(
      String(DEFAULT_CATEGORY_BEHAVIOR.lowFuelLines)
    );
    expect(
      screen.getByText(
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_HINT
      )
    ).toBeInTheDocument();
  });

  it("is hidden when the category consumes no fuel", () => {
    render(
      <CategoryBehaviorForm
        behavior={{
          ...DEFAULT_CATEGORY_BEHAVIOR,
          consumesFuel: false,
        }}
      />
    );

    expect(
      screen.queryByLabelText(
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_FIELD_LABEL
      )
    ).not.toBeInTheDocument();
  });

  it("sends the typed number of lines", async () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );

    await userEvent.clear(getLowFuelField());
    await userEvent.type(getLowFuelField(), LINES.TWO);
    await userEvent.click(
      screen.getByRole("button", {
        name: CATEGORY_CATALOG_COPY.BEHAVIOR_SUBMIT_BUTTON,
      })
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        lowFuelLines: LINES.TWO_NUMBER,
      })
    );
  });

  it("refuses a number outside 1 to 20 and says so", async () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );

    await userEvent.clear(getLowFuelField());
    await userEvent.type(getLowFuelField(), LINES.ABOVE);
    await userEvent.click(
      screen.getByRole("button", {
        name: CATEGORY_CATALOG_COPY.BEHAVIOR_SUBMIT_BUTTON,
      })
    );

    expect(
      screen.getByText(
        CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_INVALID_ERROR
      )
    ).toBeInTheDocument();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("uses an id of its own", () => {
    render(
      <CategoryBehaviorForm
        behavior={DEFAULT_CATEGORY_BEHAVIOR}
      />
    );

    expect(getLowFuelField().id).toBe(
      CATEGORY_BEHAVIOR_FORM_FIELD_ID.LOW_FUEL_LINES
    );
  });
});
