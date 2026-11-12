import {
  changeExtraName,
  changeExtraPriceCrc,
  changeExtraPriceUsd,
  createExtraMock,
  pushMock,
  renderExtraViewModel,
  submitExtraViewModel,
  updateExtraMock,
} from "./extraForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_MODE } from "../constants/ExtraFormMode.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_ID,
  FAKE_EXTRA_NAME,
  FAKE_EXTRA_PRICE_CRC_TEXT,
  FAKE_EXTRA_PRICE_USD_TEXT,
} from "./Extra.constants";
import {
  EDITED_EXTRA_NAME,
  EDITED_EXTRA_PRICE_USD_TEXT,
  EXTRA_FORM_SUCCESS_RESULT,
  SEED_CASES,
  VALID_EXTRA_FORM_VALUES,
} from "./ExtraForm.constants";

describe("useExtraFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    createExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
    updateExtraMock.mockResolvedValue(
      EXTRA_FORM_SUCCESS_RESULT
    );
  });

  it.each(SEED_CASES)(
    "seeds the $props.mode form with an idle state",
    ({ props, values }) => {
      const { result } = renderExtraViewModel(props);

      expect(result.current.values).toStrictEqual(values);
      expect(result.current.errors).toStrictEqual({});
      expect(result.current.isSubmitting).toBe(false);
    }
  );

  it("shows the required name and prices errors on submit without calling the server", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });

    await submitExtraViewModel(result);

    expect(result.current.errors).toStrictEqual({
      name: EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR,
      prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
    });
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("clears the name error when the name changes", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    await submitExtraViewModel(result);

    changeExtraName(result, FAKE_EXTRA_NAME);

    expect(result.current.errors).toStrictEqual({});
    expect(result.current.values.name).toBe(
      FAKE_EXTRA_NAME
    );
  });

  it("creates the extra with the typed name and prices", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    changeExtraName(result, FAKE_EXTRA_NAME);
    changeExtraPriceUsd(result, FAKE_EXTRA_PRICE_USD_TEXT);
    changeExtraPriceCrc(result, FAKE_EXTRA_PRICE_CRC_TEXT);

    await submitExtraViewModel(result);

    expect(createExtraMock).toHaveBeenCalledWith({
      name: FAKE_EXTRA_NAME,
      priceUsd: FAKE_EXTRA_PRICE_USD_TEXT,
      priceCrc: FAKE_EXTRA_PRICE_CRC_TEXT,
    });
    expect(updateExtraMock).not.toHaveBeenCalled();
  });

  it("updates the extra with its id, the new name and the new price in edit mode", async () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.EDIT,
      extra: DEFAULT_EXTRA,
    });
    changeExtraName(result, EDITED_EXTRA_NAME);
    changeExtraPriceUsd(
      result,
      EDITED_EXTRA_PRICE_USD_TEXT
    );

    await submitExtraViewModel(result);

    expect(updateExtraMock).toHaveBeenCalledWith({
      ...VALID_EXTRA_FORM_VALUES,
      extraId: FAKE_EXTRA_ID,
      name: EDITED_EXTRA_NAME,
      priceUsd: EDITED_EXTRA_PRICE_USD_TEXT,
    });
    expect(createExtraMock).not.toHaveBeenCalled();
  });

  it("shows the duplicate name error on the name field", async () => {
    createExtraMock.mockResolvedValue({
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    });
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });
    changeExtraName(result, FAKE_EXTRA_NAME);
    changeExtraPriceUsd(result, FAKE_EXTRA_PRICE_USD_TEXT);

    await submitExtraViewModel(result);

    expect(result.current.errors.name).toBe(
      EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("goes back to the extra list", () => {
    const { result } = renderExtraViewModel({
      mode: EXTRA_FORM_MODE.CREATE,
    });

    act(() => {
      result.current.onBack();
    });

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.EXTRAS
    );
  });
});
