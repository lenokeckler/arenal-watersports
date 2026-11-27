import {
  changeComboName,
  pushMock,
  renderComboViewModel,
  saveComboMock,
  submitComboForm,
} from "./comboForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import {
  EMPTY_COMBO_FORM_ITEM,
  INITIAL_COMBO_FORM_VALUES,
  NO_COMBO_FORM_ERRORS,
} from "../constants/ComboFormDefaults.constants";
import { mapComboToFormValues } from "../utils/mapComboToFormValues";
import { resolveComboPriceField } from "../utils/resolveComboPriceField";
import { buildComboFormFieldChangeEvent } from "./buildComboFormFieldChangeEvent";
import {
  DEFAULT_COMBO_FOR_EDIT,
  EDIT_FORM_PROPS,
  EDITED_COMBO_NAME,
  FIRST_ITEM_QUANTITY,
  SECOND_CATEGORY_ID,
} from "./ComboForm.constants";

describe("useComboFormViewModel", () => {
  beforeEach(() => vi.resetAllMocks());

  it("seeds the create form with one empty row, the national audience and no errors", () => {
    const { result } = renderComboViewModel();

    expect(result.current.values).toStrictEqual(
      INITIAL_COMBO_FORM_VALUES
    );
    expect(result.current.errors).toStrictEqual(
      NO_COMBO_FORM_ERRORS
    );
    expect(result.current.title).toBe(
      COMBO_FORM_COPY.TITLE_CREATE
    );
    expect(result.current.isAudienceLocked).toBe(false);
    expect(result.current.priceField).toStrictEqual(
      resolveComboPriceField(COMBO_AUDIENCE.NATIONAL)
    );
  });

  it("seeds the edit form with the saved combo and locks the audience", () => {
    const { result } =
      renderComboViewModel(EDIT_FORM_PROPS);

    expect(result.current.values).toStrictEqual(
      mapComboToFormValues(DEFAULT_COMBO_FOR_EDIT)
    );
    expect(result.current.title).toBe(
      COMBO_FORM_COPY.TITLE_EDIT
    );
    expect(result.current.isAudienceLocked).toBe(true);
    expect(result.current.priceField).toStrictEqual(
      resolveComboPriceField(
        DEFAULT_COMBO_FOR_EDIT.audience
      )
    );
  });

  it("adds an empty row at the end", () => {
    const { result } = renderComboViewModel();

    act(() => result.current.onAddItem());

    expect(result.current.values.items).toStrictEqual([
      EMPTY_COMBO_FORM_ITEM,
      EMPTY_COMBO_FORM_ITEM,
    ]);
  });

  it("removes only the chosen row", () => {
    const { result } =
      renderComboViewModel(EDIT_FORM_PROPS);
    act(() => result.current.onAddItem());

    act(() => result.current.onRemoveItem(0)());

    expect(result.current.values.items).toStrictEqual([
      EMPTY_COMBO_FORM_ITEM,
    ]);
  });

  it("removes every row and leaves the list empty", () => {
    const { result } = renderComboViewModel();

    act(() => result.current.onRemoveItem(0)());

    expect(result.current.values.items).toStrictEqual([]);
  });

  it("edits the category and the quantity of one row", () => {
    const { result } = renderComboViewModel();
    act(() => result.current.onAddItem());

    act(() => {
      result.current.onItemCategoryChange(1)(
        buildComboFormFieldChangeEvent({
          value: SECOND_CATEGORY_ID,
        })
      );
      result.current.onItemQuantityChange(1)(
        buildComboFormFieldChangeEvent({
          value: FIRST_ITEM_QUANTITY.toString(),
        })
      );
    });

    expect(result.current.values.items).toStrictEqual([
      EMPTY_COMBO_FORM_ITEM,
      {
        categoryId: SECOND_CATEGORY_ID,
        quantityText: FIRST_ITEM_QUANTITY.toString(),
      },
    ]);
  });

  it("changes the audience and the price field with it", () => {
    const { result } = renderComboViewModel();

    act(() =>
      result.current.onAudienceSelect(
        COMBO_AUDIENCE.FOREIGN
      )()
    );

    expect(result.current.values.audience).toBe(
      COMBO_AUDIENCE.FOREIGN
    );
    expect(result.current.priceField).toStrictEqual(
      resolveComboPriceField(COMBO_AUDIENCE.FOREIGN)
    );
  });

  it("reports the errors only after the first submit attempt and calls no action", async () => {
    const { result } = renderComboViewModel();
    expect(result.current.errors.count).toBe(0);

    await submitComboForm(result);

    expect(result.current.errors.name).toBe(
      COMBO_FORM_COPY.NAME_REQUIRED_ERROR
    );
    expect(
      result.current.errors.itemErrors[0]
    ).toStrictEqual({
      categoryId: COMBO_FORM_COPY.CATEGORY_REQUIRED_ERROR,
      quantity: COMBO_FORM_COPY.QUANTITY_INVALID_ERROR,
    });
    expect(saveComboMock).not.toHaveBeenCalled();
  });

  it("drops an error as soon as its field is fixed", async () => {
    const { result } = renderComboViewModel();
    await submitComboForm(result);

    changeComboName(result, EDITED_COMBO_NAME);

    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.price).toBeDefined();
  });

  it("goes back to the combo list", () => {
    const { result } = renderComboViewModel();

    act(() => result.current.onBack());

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.COMBOS
    );
  });
});
